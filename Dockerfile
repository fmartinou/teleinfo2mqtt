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
RUN npm ci --omit=dev --no-audit --omit=optional --no-update-notifier

# Do not used prebuilt packages because of issues with serialport on arm
RUN npm rebuild --build-from-source

RUN apk del build_tools

# Release stage
FROM base as release

ARG IMAGE_VERSION

# OCI Meta information
LABEL \
    org.opencontainers.image.authors="fmartinou (https://github.com/fmartinou)" \
    org.opencontainers.image.source="https://github.com/fmartinou/teleinfo2mqtt" \
    org.opencontainers.image.version=${IMAGE_VERSION} \
    org.opencontainers.image.title="teleinfo2mqtt" \
    org.opencontainers.image.description="teleinfo2mqtt allows you to read Teleinfo frames from a Serial port and publish them to an Mqtt broker." \
    org.opencontainers.image.licenses="MIT"

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
