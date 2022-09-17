# Configuration
**teleinfo2mqtt** can be configured using Environment Variables.

## Environment variables

| Env var                   | Required       | Description                                                            | Supported values                                                                 | Default value when missing |
|---------------------------|----------------|------------------------------------------------------------------------|----------------------------------------------------------------------------------|----------------------------|
| **EMIT_INTERVAL**         | :white_circle: | Interval in seconds between 2 MQTT emissions (0 = All frames are sent) | from `0` to `n`                                                                  | `10`                       |
| **HASS_DISCOVERY**        | :white_circle: | Publish configuration for Home-Assistant discovery                     | `true`, `false`                                                                  | `true`                     |
| **HASS_DISCOVERY_PREFIX** | :white_circle: | Topic prefix for Home-Assistant Discovery                              | any                                                                              | `homeassistant`            |
| **LOG_LEVEL**             | :white_circle: | Log level                                                              | `error`, `info`, `debug`                                                         | `info`                     |
| **LOG_FORMAT**            | :white_circle: | Log format                                                             | `text`, `json`                                                                   | `text`                     |
| **MQTT_BASE_TOPIC**       | :white_circle: | MQTT Base topic                                                        | any                                                                              | `teleinfo`                 |
| **MQTT_URL**              | :white_circle: | MQTT Broker connection URL                                             | any valid mqtt connection string                                                 | `mqtt://localhost:1883`    |
| **MQTT_USER**             | :white_circle: | MQTT user     (optional)                                               | any                                                                              |                            |
| **MQTT_PASSWORD**         | :white_circle: | MQTT password (optional)                                               | any                                                                              |                            |
| **SERIAL**                | :white_circle: | Serial Port location                                                   | any valid serial port location                                                   | `/dev/ttyUSB0`             |
| **TIC_MODE**              | :white_circle: | TIC Mode                                                               | `history`, `standard`                                                            | `history`                  |
| **TZ**                    | :white_circle: | Timezone (for logs...)                                                 | [supported values](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) | `utc`                      |

## Complete example

<!-- tabs:start -->
#### **Docker Compose**
```yaml
version: '3'

services:
  teleinfo2mqtt:
    image: fmartinou/teleinfo2mqtt
    container_name: teleinfo2mqtt
    devices:
      - /dev/ttyUSB1:/dev/ttyUSB1
    environment:
      - SERIAL=/dev/ttyUSB1
      - MQTT_BASE_TOPIC=custom-teleinfo-topic
      - MQTT_URL=mqtt://my_mqtt_broker:1883
      - MQTT_USER=my-super-user
      - MQTT_PASSWORD=my-secret-password
      - EMIT_INTERVAL=5
      - TZ=Europe/Paris 
```
#### **Docker**
```bash
docker run -d --name teleinfo2mqtt \
  --device=/dev/ttyUSB1:/dev/ttyUSB1 \
  -e SERIAL="/dev/ttyUSB1" \
  -e MQTT_URL="mqtt://my_mqtt_broker:1883" \
  -e MQTT_USER="my-super-user" \
  -e MQTT_PASSWORD="my-secret-password" \
  -e TZ="Europe/Paris" \
  fmartinou/teleinfo2mqtt
```
<!-- tabs:end -->