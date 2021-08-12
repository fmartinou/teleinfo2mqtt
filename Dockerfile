FROM node:14-alpine

LABEL maintainer="fmartinou"

RUN apk update && apk add --no-cache make gcc g++ python3 linux-headers udev

WORKDIR /home/node/app
ENV LOG_FORMAT=text

# Default entrypoint
COPY Docker.entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["/usr/bin/entrypoint.sh"]

# Default Command
CMD ["node", "index"]

# Add TZDATA to allow easy local time configuration
RUN apk update \
    && apk add tzdata \
    && rm -rf /var/cache/apk/*

# Copy app
COPY app/ ./

# Install dependendencies
RUN npm ci --production
