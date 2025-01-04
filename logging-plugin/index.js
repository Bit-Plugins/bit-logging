const core = require("bit/core")
const config = require("../../../configs/logging-plugin/config.json")
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
    startFunction: function startFunction() {
        fs.writeFileIfNotExist = function(fname, contents, options, callback) {
            if(typeof options === "function") {
                callback = options;
                options = {};
            }

            options = options || {};
            options.flag = 'wx';

            fs.writeFile(fname, contents, options, function(err) {
                var existed = false;
                if(err, err.code === 'EEXIST') {
                    err = null;
                    existed = true;
                }

                if(typeof callback === "function") {
                    callback(err, existed);
                }
            })
        }

        var jsonToWrite = {
            "embedColours": {
		        "positive": "#00FF1C",
		        "negative": "#FF0000",
		        "neutral": "#9013FE",
		        "main": "#af0059",
		        "secondary": "#93714e"
	        },
	        "botIDs": {
		        "owner": "default",
		        "guildID": {
			        "logs": "loggingID"
		        }
	        },
	        "logs": {
		        "guildID": {
			        "channel": {
				        "create": true,
				        "edit": true,
				        "delete": true
			        },
			        "emoji": {
				        "create": true,
				        "delete": true
			        },
			        "ban": {
				        "create": true,
				        "delete": true
			        },
			        "member": {
				        "add": true,
				        "remove": true,
				        "verified": true
			        },
			        "invite": {
				        "create": true,
				        "delete": true
			        },
			        "message": {
				        "delete": true,
				        "edit": true
			        },
			        "role": {
				        "create": true,
				        "delete": true,
				        "edit": true
			        }
		        }
	        }
        }

        fs.writeFileIfNotExist("../../../configs/logging-plugin/config.json", jsonToWrite, function(err, existed) {
            if(err) {
                core.log(2, "Logging Plugin", true, "An error has occured: "+err)
            } else {
                if(existed === false) {
                    core.log(2, "Logging Plugin", true, "Please make sure to edit the config file located at configs/logging-plugin/config.json!")
                    core.log(2, "Logging Plugin", true, "Stopping Bot!")
                    process.exit(1);
                }
            }
        })
    }
};