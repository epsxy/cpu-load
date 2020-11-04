FROM node:stretch

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

COPY client /usr/src/app/client
COPY server /usr/src/app/server

RUN yarn install

RUN yarn workspace client run build
RUN yarn workspace server run build

# Remove sources
RUN mkdir /usr/src/app/client-temp
RUN mkdir /usr/src/app/server-temp
RUN cp /usr/src/app/client/package.json /usr/src/app/client-temp/package.json
RUN cp -r /usr/src/app/client/build /usr/src/app/client-temp/build
RUN cp /usr/src/app/server/package.json /usr/src/app/server-temp/package.json
RUN cp -r /usr/src/app/server/dist /usr/src/app/server-temp/dist
RUN rm -rf /usr/src/app/client
RUN rm -rf /usr/src/app/server
RUN mv /usr/src/app/client-temp /usr/src/app/client
RUN mv /usr/src/app/server-temp /usr/src/app/server

ENTRYPOINT [ "yarn", "workspace", "server", "run", "start:prod" ]