ARG BASE_IMAGE=node:12-alpine
FROM $BASE_IMAGE

LABEL maintainer="fmartinou"

RUN apk update && apk add --no-cache make gcc g++ python linux-headers udev

WORKDIR /home/node/app

# Default Command
CMD ["node", "index"]

# Copy package.json
COPY package* ./

# Copy app
COPY app/ ./

# Install dependendencies
RUN npm ci --production
