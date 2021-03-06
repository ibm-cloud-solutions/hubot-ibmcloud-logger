[![Build Status](https://travis-ci.org/ibm-cloud-solutions/hubot-ibmcloud-logger.svg?branch=master)](https://travis-ci.org/ibm-cloud-solutions/hubot-ibmcloud-logger)
[![Coverage Status](https://coveralls.io/repos/github/ibm-cloud-solutions/hubot-ibmcloud-logger/badge.svg?branch=master)](https://coveralls.io/github/ibm-cloud-solutions/hubot-ibmcloud-logger?branch=master)
[![Dependency Status](https://dependencyci.com/github/ibm-cloud-solutions/hubot-ibmcloud-logger/badge)](https://dependencyci.com/github/ibm-cloud-solutions/hubot-ibmcloud-logger)
[![npm](https://img.shields.io/npm/v/hubot-ibmcloud-logger.svg?maxAge=2592000)](https://www.npmjs.com/package/hubot-ibmcloud-logger)

# hubot-ibmcloud-logger

Logging utility for IBM Cloud hubot scripts

## Getting Started
  * [Usage](#usage)
  * [Installation](#installation)
  * [Logging](#logging)
  * [License](#license)
  * [Contribute](#contribute)

## Usage
This script intercepts calls to `robot.logger` to add more detailed information about the state of the bot when the logging method was invoked. No changes are required, and one can continue to make calls to the logging functions as one normally would.

## Installation
```shell
npm install -S hubot-ibmcloud-logger
```
Add `"hubot-ibmcloud-logger"` to the array in `external-scripts.json`.

## Logging <a id="logging"></a>
Hubot uses the environment variable `HUBOT_LOG_LEVEL` to control the bots logging level. Invoking the robot logger functionality will add detailed information about the bot state.

### Usage
```javascript
var path = require('path');
var TAG = path.basename(__filename);
robot.logger.debug(`${TAG}: A debug test`);
robot.logger.info(`${TAG}: An info test`);
robot.logger.warning(`${TAG}: A warning test`);
robot.logger.error(`${TAG}: An error test`);
```

### Output
```
[Tue Jun 28 2016 20:44:12 GMT-0400 (EDT)] DEBUG script.js: A debug test, Adapter: slack, Robot: hubot, Room: secret-channel, User: {name: 'Mimiron'}
[Tue Jun 28 2016 20:44:12 GMT-0400 (EDT)] INFO script.js: An info test, Adapter: slack, Robot: hubot, Room: secret-channel, User: {name: 'Mimiron'}
[Tue Jun 28 2016 20:44:12 GMT-0400 (EDT)] WARNING script.js: A warning test, Adapter: slack, Robot: hubot, Room: secret-channel, User: {name: 'Mimiron'}
[Tue Jun 28 2016 20:44:12 GMT-0400 (EDT)] ERROR script.js: An error test, Adapter: slack, Robot: hubot, Room: secret-channel, User: {name: 'Mimiron'}
```

## License

See [LICENSE.txt](https://github.com/ibm-cloud-solutions/hubot-ibmcloud-logger/blob/master/LICENSE.txt) for license information.

## Contribute

Please check out our [Contribution Guidelines](https://github.com/ibm-cloud-solutions/hubot-ibmcloud-logger/blob/master/CONTRIBUTING.md) for detailed information on how you can lend a hand.
