const Readline = require('@serialport/parser-readline');
const SerialPort = require('serialport');
const events = require('events');
const deepEqual = require('deep-equal');
const log = require('../log');
const { emitInterval, serial, ticMode } = require('../config');

let serialPort;
let previousFrame = {};
let currentFrame = {};
let lastEmitTime = Date.now();

function isSameFrame(frame1, frame2) {
    return deepEqual(frame1, frame2);
}

//check all data which can be received by standard mode
function CheckStandardData(lineItems)
{
    switch (lineItems[0]) 
    {
    case 'ADSC':
    {
        if(lineItems.length >= 2 && lineItems[1].length == 12)
        {
           return 1;
        }
        else
        {
           return -1;
        }
    }
    case 'VTIC':
    {
        if(lineItems.length >= 2 && lineItems[1].length == 2)
        {
           return 1;
        }
        else
        {
           return -1;
        }
    }
    case 'DATE':
    {
        if(lineItems.length >= 2)
        {
           return 1;
        }
        else
        {
           return -1;
        }
    }
    case 'NGTF':
    case 'LTARF':
    {
        if(lineItems.length >= 2 && lineItems[1].length == 16)
        {
           return 1;
        }
        else
        {
           return -1;
        }
    }
    case 'EAST':
    case 'EASF01':
    case 'EASF02':
    case 'EASF03':
    case 'EASF04':
    case 'EASF05':
    case 'EASF06':
    case 'EASF07':
    case 'EASF08':
    case 'EASF09':
    case 'EASF10':
    case 'EASD01':
    case 'EASD02':
    case 'EASD03':
    case 'EASD04':
    case 'EAIT':
    case 'ERQ1':
    case 'ERQ2':
    case 'ERQ3':
    case 'ERQ4':
    case 'LTARF':
    {
        if(lineItems.length >= 2 && lineItems[1].length == 9)
        {
           return 1;
        }
        else
        {
           return -1;
        }
    }
    case 'IRMS1':
    case 'IRMS2':
    case 'IRMS3':
    case 'URMS1':
    case 'URMS2':
    case 'URMS3':
    {
        if(lineItems.length >= 2 && lineItems[1].length == 3)
        {
           return 1;
        }
        else
        {
           return -1;
        }
    }
    case 'PREF':
    case 'PCOUP':
    {
        if(lineItems.length >= 2 && lineItems[1].length == 2)
        {
           return 1;
        }
        else
        {
           return -1;
        }
    }
    case 'SINSTS':
    case 'SINSTS1':
    case 'SINSTS2':
    case 'SINSTS3':
    {
        if(lineItems.length >= 2 && lineItems[1].length == 5)
        {
           return 1;
        }
        else
        {
           return -1;
        }
    }   
    case 'SMAXSN':
    case 'SMAXSN1':
    case 'SMAXSN2':
    case 'SMAXSN3':
    case 'SMAXSN-1':
    case 'SMAXSN1-1':
    case 'SMAXSN2-1':
    case 'SMAXSN3-1':
    {
        if(lineItems.length >= 3 && lineItems[2].length == 5)
        {
           return 2;
        }
        else
        {
           return -1;
        }
    } 
    case 'SINSTI':
    {
        if(lineItems.length >= 2 && lineItems[1].length == 5)
        {
           return 1;
        }
        else
        {
           return -1;
        }
    } 
    case 'SMAXIN':  
    case 'SMAXIN-1':
    case 'CCASN':
    case 'CCASN-1':
    case 'CCAIN':
    case 'CCAIN-1':
    {
        if(lineItems.length >= 3 && lineItems[2].length == 5)
        {
           return 2;
        }
        else
        {
           return -1;
        }
    } 
    case 'UMOY1':
    case 'UMOY2':
    case 'UMOY3':
    {
        if(lineItems.length >= 3 && lineItems[2].length == 3)
        {
           return 2;
        }
        else
        {
           return -1;
        }
    }
    case 'STGE':
    {
        if(lineItems.length >= 2 && lineItems[1].length == 8)
        {
           return 1;
        }
        else
        {
           return -1;
        }
    }
    case 'DPM1':
    case 'FPM1':
    case 'DPM2':
    case 'FPM2':
    case 'DPM3':
    case 'FPM3':
    {
        if(lineItems.length >= 3 && lineItems[2].length == 2)
        {
           return 2;
        }
        else
        {
           return -1;
        }
    }
    //MSG1
    //MSG2
    case 'PRM':
    {
        if(lineItems.length >= 2 && lineItems[1].length == 14)
        {
           return 1;
        }
        else
        {
           return -1;
        }
    }
    case 'RELAIS':
    {
        if(lineItems.length >= 2 && lineItems[1].length == 3)
        {
           return 1;
        }
        else
        {
           return -1;
        }
    }
    case 'NTARF':
    {
        if(lineItems.length >= 2 && lineItems[1].length == 2)
        {
           return 1;
        }
        else
        {
           return -1;
        }
    }
    case 'NJOURF':
    {
        if(lineItems.length >= 2 && lineItems[1].length == 2)
        {
           return 1;
        }
        else
        {
           return -1;
        }
    }
    case 'NJOURF+1':
    {
        if(lineItems.length >= 2 && lineItems[1].length == 2)
        {
           return 1;
        }
        else
        {
           return -1;
        }
    }
    //PJOURF+1
    //PPOINTE
    }
    return -1;
}

/**
 * Process data.
 * @param {*} data
 * @param {*} teleInfoEventEmitter
 */
function processData(data, teleInfoEventEmitter) {
    const dataStr = data.toString('utf-8');

    // Split line `${label} ${value} ${checksum}
    const lineItems = dataStr.split(/\s+/);
    
    if (lineItems.length < 3) {
        log.error(`Corrupted data received [${dataStr}]`);
        return;
    }
    
    var dataIndex = 1;
    if(ticMode === 'HISTORY')
    {
        
    }
    else
    {
        dataIndex = CheckStandardData(lineItems);
    }
    
    if(dataIndex == -1)
    {
        return;
    }

    const label = lineItems[0];

    // Frame end? -> Dispatch frame event
    if ((ticMode === 'HISTORY' && label === 'MOTDETAT' && currentFrame.ADCO) || (ticMode === 'STANDARD' && label === 'ADSC' && currentFrame.ADSC))
    {
        if (!isSameFrame(currentFrame, previousFrame)) 
        {
            // Don't emit a second frame in emit interval
            const currentTime = Date.now();
            if (currentTime - lastEmitTime > emitInterval * 1000) 
            {
                log.debug(`Dispatch frame ${JSON.stringify(currentFrame)}`);
                teleInfoEventEmitter.emit('frame', currentFrame);
                lastEmitTime = currentTime;
            } else 
            {
                log.debug(`Ignoring MQTT emission because of emit interval (Emit interval : ${emitInterval} - Last emit time : ${lastEmitTime} - Current time : ${currentTime}`);
            }
        } 
        else 
        {
            log.debug(`Ignoring identical frame ${JSON.stringify(currentFrame)}`);
        }
        return;
    }

    // Frame start? -> Reset frame object
    if ((ticMode === 'HISTORY' && label === 'ADCO') || (ticMode === 'STANDARD' && label === 'ADSC')) 
    {
        previousFrame = currentFrame;
        currentFrame = {};
    }

    // Sanitize value & try to convert to number
    const valueSanitized = lineItems[dataIndex].replace(/\.\./g, '');
    const valueNumber = Number.parseInt(valueSanitized, 10);
    const value = !Number.isNaN(valueNumber) ? valueNumber : valueSanitized;

    currentFrame[label] = {
        raw: lineItems[dataIndex],
        value,
    };
}

/**
 * Process errors.
 * @param {*} error
 */
function processError(error) {
    log.error('Error on reading data');
    log.error(error);
}

/**
 * Connect so serial port & start reading.
 */
async function connect() {
    return new Promise((resolve, reject) => {
        log.info(`Connecting to port [${serial}]`);
        const baudRateVar = ticMode === 'STANDARD' ? 9600 : 1200;
        serialPort = new SerialPort(serial, {
            baudRate: baudRateVar,
            dataBits: 7,
            parity: 'even',
            stopBits: 1,
        }, (error) => {
            if (error) {
                log.error(`Error when connecting to serial port [${error.message}]`);
                reject(error);
            } else {
                const parser = serialPort.pipe(new Readline());

                const teleInfoEventEmitter = new events.EventEmitter();

                log.info(`Connected to port [${serial}]`);

                // Process data
                parser.on('data', (data) => processData(data, teleInfoEventEmitter));

                // Process error
                parser.on('error', processError);

                resolve(teleInfoEventEmitter);
            }
        });
    });
}

/**
 * Disconnect from serial port.
 */
async function disconnect() {
    log.info(`Disconnecting teleinfo from port [${serial}]`);
    return new Promise((resolve, reject) => {
        serialPort.close((e) => {
            if (e) {
                log.error(`Error on disconnecting teleinfo from port [${serial}]`);
                reject(e);
            } else {
                log.info(`Disconnected teleinfo from port [${serial}]`);
                resolve();
            }
        });
    });
}

module.exports = {
    connect,
    disconnect,
};
