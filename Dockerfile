FROM node:20.9.0-alpine3.17

WORKDIR /opt/node/esanchez-devel-blog

COPY . /opt/node/esanchez-devel-blog

RUN npm install

ENTRYPOINT [ "node", "/opt/node/esanchez-devel-blog/app.js" ]

EXPOSE 4200