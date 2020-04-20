FROM node:alpine

RUN apk add git --no-cache

WORKDIR /app

COPY ./package.json .

COPY ./package-lock.json .

RUN npm install -f

COPY . .

CMD ["npm", "run", "build"]