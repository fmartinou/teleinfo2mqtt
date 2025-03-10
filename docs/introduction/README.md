# Introduction

![Docker pulls](https://img.shields.io/docker/pulls/fmartinou/teleinfo2mqtt)
![License](https://img.shields.io/github/license/fmartinou/teleinfo2mqtt)
![Travis](https://img.shields.io/travis/fmartinou/teleinfo2mqtt/master)
![Maintainability](https://img.shields.io/codeclimate/maintainability/fmartinou/teleinfo2mqtt)
![Coverage](https://img.shields.io/codeclimate/coverage/fmartinou/teleinfo2mqtt)

**teleinfo2mqtt** allows you to read Teleinfo frames from a Serial port and publish them to an Mqtt broker.

> **teleinfo2mqtt** supports both `HISTORY` and `̀STANDARD` modes.

## Quick start

### Run the Docker image
The easiest way to start is to deploy the official _**teleinfo2mqtt**_ image.

<!-- tabs:start -->
#### **Docker Compose**
```yaml
version: '3'

services:
  teleinfo2mqtt:
    image: fmartinou/teleinfo2mqtt
    container_name: teleinfo2mqtt
    devices:
      - /dev/ttyUSB0:/dev/ttyUSB0             # Serial port device
    environment:
      - MQTT_URL=mqtt://my_mqtt_broker:1883   # MQTT broker url   
```
#### **Docker**
```bash
docker run -d --name teleinfo2mqtt \
  --device=/dev/ttyUSB0:/dev/ttyUSB0 \
  -e MQTT_URL=mqtt://my_mqtt_broker:1883 \
  fmartinou/teleinfo2mqtt
```
<!-- tabs:end -->

## Contact & Support

- Create a [GitHub issue](https://github.com/fmartinou/teleinfo2mqtt/issues) for bug reports, feature requests, or questions
- Add a ⭐️ [star on GitHub](https://github.com/fmartinou/teleinfo2mqtt) to support the project!

## License

This project is licensed under the [MIT license](https://github.com/fmartinou/teleinfo2mqtt/blob/master/LICENSE).

<!-- GitHub Buttons -->
<script async defer src="https://buttons.github.io/buttons.js"></script>