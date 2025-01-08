const core = require("bit/core")
const config = require("../../../configs/logging-plugin/config.json")
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
    startFunction: function startFunction() {
		core.log(1, "Logging Plugin", true, "Please make sure to edit the config file.")
		core.log(1, "Logging Plugin", true, "This can be found in the configs/logging-plugin folder!")
    }
};