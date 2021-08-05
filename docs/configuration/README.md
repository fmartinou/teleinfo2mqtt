# Configuration
Teleinfo-Mqtt can be configured using Environment Variables.

## Environment variables

| Env var              | Description                                                            | Default value          |
|----------------------|------------------------------------------------------------------------|------------------------|
|EMIT_INTERVAL         | Interval in seconds between 2 MQTT emissions (0 = All frames are sent) | 10                     |
|HASS_DISCOVERY_PREFIX | Topic prefix for Home-Assistant Discovery                              | homeassistant          |
|LOG_LEVEL             | Log level (INFO, DEBUG, ERROR)                                         | INFO                   |
|LOG_FORMAT            | Log format (text, json)                                                | text                   |
|MQTT_BASE_TOPIC       | MQTT Base topic                                                        | teleinfo               |
|MQTT_URL              | MQTT Broker connection URL                                             | mqtt://localhost:1883  |
|MQTT_USER             | MQTT user     (optional)                                               |                        |
|MQTT_PASSWORD         | MQTT password (optional)                                               |                        |
|SERIAL                | Serial Port location                                                   | /dev/ttyUSB0           |

## Complete example

<!-- tabs:start -->
#### **Docker Compose**
```yaml
version: '3'

services:
  teleinfo2mqtt:
    image: fmartinou/teleinfo-mqtt
    container_name: teleinfo2mqtt
    device:
      - /dev/ttyUSB1:/dev/ttyUSB1
    environment:
      - SERIAL=/dev/ttyUSB1
      - MQTT_BASE_TOPIC=custom-teleinfo-topic
      - MQTT_URL=mqtt://my_mqtt_broker:1883
      - MQTT_USER=my-super-user
      - MQTT_PASSWORD=my-secret-password
      - EMIT_INTERVAL=5
```
#### **Docker**
```bash
docker run -d --name teleinfo2mqtt \
  --device=/dev/ttyUSB1:/dev/ttyUSB1 \
  -e SERIAL="/dev/ttyUSB1" \
  -e MQTT_URL="mqtt://my_mqtt_broker:1883" \
  -e MQTT_USER="my-super-user" \
  -e MQTT_PASSWORD="my-secret-password" \
  fmartinou/teleinfo-mqtt
```
<!-- tabs:end -->