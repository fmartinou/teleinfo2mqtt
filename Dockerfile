# Common Stage
FROM node:18-alpine as base

LABEL maintainer="fmartinou"

WORKDIR /home/node/app
ENV LOG_FORMAT=text

## Add TZDATA to allow easy local time configuration
RUN apk add --no-cache tzdata

# Dependencies stage
FROM base as dependencies

COPY app/package*.json app/index.js ./

RUN apk update
RUN apk add --no-cache --virtual build_tools make gcc g++ python3 linux-headers udev
# RUN npm ci --omit=dev --no-audit --omit=optional --no-update-notifier

RUN npm install --verbose

RUN apk del build_tools

# Release stage
FROM base as release

## Copy node_modules
COPY --from=dependencies /home/node/app/node_modules ./node_modules

## Default entrypoint
COPY Docker.entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["/usr/bin/entrypoint.sh"]

## Copy app
COPY app/ ./

## Default Command
CMD ["node", "index"]
