FROM node:14-alpine
ENV APP_ROOT /web

WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN apk update && \
    apk upgrade && \
    apk add --no-cache bash git openssh python make g++

RUN npm ci
RUN npm run build:ssr

CMD ["npm", "run", "serve:ssr"]
