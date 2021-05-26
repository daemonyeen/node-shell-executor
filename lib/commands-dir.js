const path = require('path');
const os = require('os');
const process = require('process');

let config = require('../config.json');

try {
    // merge user config
    config = {
        ...config,
        ...require(path.resolve('~/.nserc.json'.replace('~', os.homedir())))
    };
} catch(e) {}

if (typeof config.commandsDir !== 'string') {
    console.log('Error: please specify valid [commandsDir] option in your ~/.nserc.json file');
    process.exit(1);
}

module.exports = path.resolve(config.commandsDir.replace('~', os.homedir()));
