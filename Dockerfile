FROM node:13.13.0-alpine3.11

RUN \
  apk add --no-cache git python make g++ && \
  rm -fR /var/cache/apk/*

WORKDIR /app

COPY ./package.json .

COPY ./package-lock.json .

RUN npm install -f

COPY . .

CMD ["npm", "run", "build"]