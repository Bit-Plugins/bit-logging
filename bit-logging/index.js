const core = require("bit/core")

module.exports = {
  start_function: function start_function() {
		core.log(1, "Logging Plugin", true, "Please make sure to edit the config file.")
		core.log(1, "Logging Plugin", true, "This can be found in the configs/bit-logging folder!")
  }
};