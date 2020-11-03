# DOCKER VERSION of Static site generator for Simple Knowledge Management Systems (SKOS)

This part of the [SkoHub](http://skohub.io) project covers the need to easily publish a controlled vocabulary as a SKOS file, with a basic lookup API and a nice HTML view including links to an inbox for each subject. It consists of two parts: the actual static site generator and a webhook server that allows to trigger a build from GitHub. For usage & implementation details see the [blog post](https://blog.lobid.org/2019/09/27/presenting-skohub-vocabs.html).

## Docker Set up

You can pull the container from [Docker Hub](https://hub.docker.com/r/skohub/skohub-vocabs-docker) and let your vocabulary be built in the container.
To have access to the `data`-folder as input and the `public`-folder as output, we can bind mount these to the container.
To be able to serve your site from some other location as root (e.g. being served via GitHub-Pages) you can also bind mount an `.env.production`-file and provide the respective `PATH_PREFIX`. See `.env.production.example` for an example (rename it to `.env.production` for using it).
If you want to test a docker command could look like this:

`docker run -v $(pwd)/public:/app/public -v $(pwd)/data:/app/data -v $(pwd)/.env.production:/app/.env.production skohub/skohub-vocabs-docker:latest`

An exemplary use case might be you want to use GitHub (or GitLab) infrastructure to host your vocabulary.
You can provide the repo-path in `.env.production` and implement a GitHub Action which will build the vocabulary and push it to a GitHub-Pages branch.
See this repo as an example: <https://github.com/skohub-io/skohub-docker-vocabs>

## Set up

    $ git clone https://github.com/skohub-io/skohub-vocabs.git
    $ cd skohub-vocabs
    $ npm i
    $ cp .env.example .env
    $ cp test/data/systematik.ttl data/

The `.env` file contains configuration details used by the static site generator and the webhook server (like `PORT`, see below).

After changes to your `.env` or `data/*` files, make sure to delete the `.cache` directory:

    $ rm -rf .cache

## Running the static site generator

The static site generator will parse all turtle files in `./data` and build the vocabularies it finds:

    $ npm run build

The build can be found in `public/` and be served e.g. by Apache. The directory structure is derived from the URIs of the SKOS concepts, e.g. `https://w3id.org/class/hochschulfaecher/scheme` will be available from `public/w3id.org/class/hochschulfaecher/scheme(.html|.json)`.

You can also run the development web server:

    $ npm run develop

to serve the build from `http://localhost:8000/`. Again, the URL is based on the SKOS URIs, e.g. `http://localhost:8000/w3id.org/class/hochschulfaecher/scheme.html`

## Running the webhook server

The webhook server allows to trigger a build when vocabularies are updated (i.e. changes are merged into the `master` branch) on GitHub.

Running `npm run listen` will start the server on the defined `PORT` and expose a `build` endpoint. In order to wire this up with GitHub, this has to be available to the public. You can then configure the webhook in your GitHub repositories settings:

![image](https://user-images.githubusercontent.com/149825/62695510-c756b880-b9d6-11e9-86a9-0c4dcd6bc2cd.png)

## Connecting to our webhook server

Feel free to clone https://github.com/literarymachine/skos.git to poke around. Go to https://github.com/YOUR_GITHUB_USER/skos/settings/hooks/new to set up the web hook (get in touch to receive the secret). Edit https://github.com/YOUR_GITHUB_USER/skos/edit/master/hochschulfaecher.ttl and commit the changes to master. This will trigger a build and expose it at https://test.skohub.io/YOUR_GITHUB_USER/skos/w3id.org/class/hochschulfaecher/scheme.

## Use start scripts and monit
You may want to use the start scripts in `scripts/` to manage via init and to monitor with `monit`.
