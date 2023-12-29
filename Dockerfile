FROM node:20.9.0-alpine3.17

WORKDIR /opt/node/esanchez-devel-blog

COPY . /opt/node/esanchez-devel-blog

RUN apk add --no-cache make gcc g++ python3
RUN npm install
RUN npm rebuild bcrypt --build-from-source

ENTRYPOINT [ "node", "/opt/node/esanchez-devel-blog/app.js" ]

EXPOSE 4200