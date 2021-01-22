'use strict';

const fs = require('fs');

class ConfigJson {

  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options || {};
    this.commands = {
      copy: {
        usage: "Copy config.json",
        lifecycleEvents: [
          'copy'
        ]
      }
    };

    this.hooks['after:deploy:deploy'] = this.copy.bind(this);
  }

  copy() {
    const { cli } = this.serverless;
    const { from, to } = this.serverless.service.custom.configJson;
    const { stage } = this.serverless.service.provider;

    if (!from || !to) {
      cli.consoleLog('Missing configuration, check from and to!');

      return;
    }

    if (!stage) {
      cli.consoleLog('Stage is not set, skipping copy of config.json');

      return;
    }

    from = from.replace(/\/$/, "");
    to = to.replace(/\/$/, "");

    const configFile = `./${from}/${stage}.json`
    const outputFile = `./${to}/config.json`

    try {
      fs.copyFileSync(configFile, outputFile);
    } catch (error) {
      cli.consoleLog(error.getMessage());
    }
  }
}

module.exports = ConfigJson;
