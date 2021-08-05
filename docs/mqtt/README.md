# Mqtt

## Topic
Messages are published to a `$MQTT_BASE_TOPIC/$ADCO` topic.

?> [`$MQTT_BASE_TOPIC`](configuration/) is configured by env var (`teleinfo` by default)

?> `$ADCO` is the id of your electricity meter (received from teleinfo data)

## Message
Messages are JSON documents whose content may vary upon your Electricity meter.

?> Values are sanitized and converted to Numbers if possible.  
You can still access the original `raw` value if necessary.

### Example
```json
{
    "ADCO": {
        "raw": "12345678901",
        "value": 12345678901
    },
    "OPTARIF": {
        "raw": "HC..",
        "value": "HC"
    },
    "ISOUSC": {
        "raw": "45",
        "value": 45
    },
    "HCHC": {
        "raw": "9058688",
        "value": 9058688
    },
    "HCHP": {
        "raw": "9752846",
        "value": 9752846
    },
    "PTEC": {
        "raw": "HP..",
        "value": "HP"
    },
    "IINST": {
        "raw": "22",
        "value": 22
    },
    "IMAX": {
        "raw": "90",
        "value": 90
    },
    "PAPP": {
        "raw": "4110",
        "value": 4110
    },
    "PAPP": {
        "raw": "A",
        "value": "A"
    }
}
```

