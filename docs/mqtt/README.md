# Mqtt

## Topic
**teleinfo2mqtt** publishes messages to the `$mqtt_base_topicMQTT_BASE_TOPIC/c` topic.

?> [`$MQTT_BASE_TOPIC`](configuration/) is configured by env var (`teleinfo` by default)

?> `$mqtt_base_topic` is the id of your electricity meter (received from teleinfo data as `ADCO` or `ADSC` labels)

## Message
Messages are JSON documents whose content may vary upon your Electricity meter.

?> Values are sanitized and converted to Numbers if possible.  
You can still access the original `raw` value if necessary.

?> When timestamps are part of the value, they are parsed to UTC timestamps and daylight saving time information.

### Data example

<!-- tabs:start -->
#### **History mode**
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

#### **Standard mode**
```json
{
  "ADSC": {
    "raw": "12345678901",
    "value": 12345678901
  },
  "EASF06":{
    "raw":"000000000",
    "value":0
  },
  "NGTF":{
    "raw":"H PLEINE/CREUSE",
    "value":"H PLEINE/CREUSE"
  },
  "SMAXSN":{
    "raw":"02740",
    "value":2740,
    "timestamp":{
      "date":"2022-06-09T06:05:31.000Z",
      "dst":"summer"
    }
  }
}
```
<!-- tabs:end -->