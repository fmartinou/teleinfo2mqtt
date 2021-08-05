# Changelog

## develop
- :star: Include ADCO in topic
- :star: New docsify documentation
- :star: Upgrade all dependencies
- :fire: Rollback to Node.js 14 because of Raspberry pi Zero runtime error

!> **Breaking changes**  
Default topic name has been changed  
HASS_IDENTIFIER env var has been removed

## 4.0.0
- :star: Upgrade to node 16
- :fire: Fix reconnect issue when broker is restarted

!> **Breaking changes**  
Home-Assistant related env vars have been renamed  
Emit interval is now 1 frame every 10 seconds by default  
Logs are now Text by default (instead of JSON)

## 3.0.0
- :star: Add Homeassistant MQTT Discovery capabilities
- :star: Upgrade all dependencies

## 2.3.1
- :star: Upgrade all dependencies

## 2.3.1
- :star: Upgrade all dependencies

## 2.3.0
- :star: Upgrade to node 14
- :star: Upgrade all dependencies

## 2.2.0
- :star: Prevent identical frames to be published

## 2.1.0
- :star: Add ARM v6 support

## 2.0.0
- :star: Add multi arch Docker images (i386 / amd64 / armv7 / arm64)

## 1.0.0
- :star: Initial release
