const core = require("bit/core")

module.exports = {
  define_intents: function define_intents() {
    core.add_intent(GatewayIntentBits.Guilds);
    core.add_intent(GatewayIntentBits.GuildMembers);
    core.add_intent(GatewayIntentBits.GuildModeration);
    core.add_intent(GatewayIntentBits.GuildInvites);
    core.add_intent(GatewayIntentBits.MessageContent);
  },

  start_function: function start_function() {
		core.log(1, "Bit: Logging", true, "Please make sure to edit the config file.")
		core.log(1, "Bit: Logging", true, "This can be found in the configs/bit-logging folder!")
  },

  channel_lookup: function channel_lookup(type) {
    const lookup = [
      { value: 0, name: "Guild Text" },
      { value: 1, name: "DM" },
      { value: 2, name: "Guild Voice" },
      { value: 3, name: "Group DM" },
      { value: 4, name: "Guild Category" },
      { value: 5, name: "Guild Announcement" },
      { value: 6, name: "Unknown" },
      { value: 7, name: "Unknown" },
      { value: 8, name: "Unknown" },
      { value: 9, name: "Unknown" },
      { value: 10, name: "Announcement Thread" },
      { value: 11, name: "Public Thread" },
      { value: 12, name: "Private Thread" },
      { value: 13, name: "Guild Stage Voice" },
      { value: 14, name: "Guild Directory" },
      { value: 15, name: "Guild Forum" },
      { value: 16, name: "Guild Media"},
      { value: 17, name: "Unknown"},
      { value: 18, name: "Unknown"},
      { value: 19, name: "Unknown"},
      { value: 20, name: "Unknown"},
      { value: 21, name: "Unknown"},
      { value: 22, name: "Unknown"},
      { value: 23, name: "Unknown"},
      { value: 24, name: "Unknown"},
      { value: 25, name: "Unknown"},
      { value: 26, name: "Unknown"},
      { value: 27, name: "Unknown"},
      { value: 28, name: "Unknown"},
      { value: 29, name: "Unknown"},
      { value: 30, name: "Unknown"},
    ];

    return lookup[type].name
  }
};