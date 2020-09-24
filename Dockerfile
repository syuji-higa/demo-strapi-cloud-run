FROM node:12-slim

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY ./app/package.json ./
COPY ./app/yarn.lock ./

RUN yarn install \
    --prefer-offline \
    --frozen-lockfile\
    --non-interractive \
    --production=true

COPY ./app ./

RUN yarn build

COPY startup.sh /startup.sh

RUN chmod 744 /startup.sh

CMD ["/startup.sh"]
