FROM node:alpine

RUN \
  apk add --no-cache git python make g++ && \
  rm -fR /var/cache/apk/*

WORKDIR /app

COPY ./package.json .

COPY ./package-lock.json .

RUN npm install -f

COPY . .

CMD ["npm", "run", "build"]