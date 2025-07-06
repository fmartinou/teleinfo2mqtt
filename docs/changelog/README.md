# Changelog

## 9.0.6
- :fire: Fix `PREF` and `PCOUP` value parsing

## 9.0.5
- :star: Decode `STGE` label and expose as HASS attributes
- :fire: Fix "kVA is not valid" in HASS"
- :fire: Fix "VArh is not valid" in HASS"
- :fire: Fix "kVA & VArh is not a valid unit & will stop working in HA Core 2025.7.0"

## 9.0.4
- :fire: Fix tempo today/tomorrow value retrieval (remaining days per color has been temporary disabled; waiting for a solution)

## 9.0.3
- :fire: Fix invalid topic names for some `standard` labels causing HA discovery failures (`pjourf+1`...)

## 9.0.2
- :fire: Fix segmentation fault on arm devices
- :fire: Fix broken HASS entity ids

## 9.0.1
- :fire: Fix TEMPO_ENABLED configuration parsing error on hassio

## 9.0.0
- :star: Add extra EDF Tempo data fetch
- :star: Upgrade to node.js 18
- :star: Update all dependencies
- :fire: Fix missing hass sensors when first frames are corrupted 
- :fire: Fix in-memory frame never reset in `standard` mode

## 8.3.3
- :fire: Use Home-Assistant `apparent_power` device class for sensors with VA unit

## 8.3.2
- :fire: Fix `DPM1` and `FPM1`when using a `TEMPO` offer

## 8.3.1
- :fire: Fix `STGE` parsing
- :fire: Prevent abnormal index value from being published

## 8.3.0
- :star: Use docker multi-stage build to reduce image size
- :fire: Fix `FPM1`, `FPM2`, `FPM3` and `PPOINTE` parsing
- :fire: Fix missing Home-Assistant `measurement` class for some sensors

## 8.2.0
- :star: Add MQTT health status topic (teleinfo/status = true)
- :fire: Fix wrong value retained after a period of consumption stability

## 8.1.3
- :fire: Rollback "Fix home-assistant configuration not republished when the MQTT broker is restarted (without retain option)"

## 8.1.2
- :star: update all dependencies
- :fire: Fix home-assistant configuration not republished when the MQTT broker is restarted (without retain option)
 
## 8.1.1
- :fire: Fix `SERIAL` environment variable not being picked-up

## 8.1.0
- :star: Add mTLS support for mqtt connection

## 8.0.2
- :fire: Fix `HISTORY` mode for three-phase counters

## 8.0.1
- :fire: Fix `DATE` and `PJOURF+1` labels parsing

## 8.0.0
- :star: Rename the project from `teleinfo-mqtt` to `teleinfo2mqtt`

## 7.0.2
- :fire: Fix `STANDARD` frames bad parsing (next try...)

## 7.0.1
- :fire: Downgrade serialport lib because of crash on raspberry-pi like devices
- :fire: Fix `STANDARD` frames bad parsing 

## 7.0.0
- :star: Add support for TIC `STANDARD` mode

## 6.1.0
- :star: Add compatibility to [Home-Assistant add-on system](https://github.com/fmartinou/hassio-addons) 

## 6.0.2
- :fire: Remove deprecated `last_reset` prop for home-assistant 2021.9

## 6.0.1
- :fire: Fix missing `total_increasing` state_class for home-assistant 2021.9

## 6.0.0
- :star: Support [Home-Assistant Energy platform](https://www.home-assistant.io/home-energy-management/) 
- :star: Support TZ env var for local time configuration
- :star: Improve logs

!> **Breaking changes**  
Home-Assistant integration changed; now there is 1 sensor per Teleinfo tag (PAPP, BASE, HPHP...)

## 5.0.0
- :star: Include ADCO in topic
- :star: New docsify documentation
- :star: Upgrade all dependencies
- :fire: Rollback to Node.js 14 because of Raspberry pi Zero runtime error

!> **Breaking changes**  
Default topic name has been changed
HASS_IDENTIFIER env var has been removed
Home-assistant sensor id changed

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
