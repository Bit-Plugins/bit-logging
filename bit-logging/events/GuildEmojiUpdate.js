const { EmbedBuilder, Events } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")

module.exports = {
	name: Events.GuildoldEmojiUpdate,
	execute(oldoldEmoji, newEmoji) {
        const client = oldEmoji.client

		if(logs[oldEmoji.guild.id]) {
			if(logs[oldEmoji.guild.id].emoji.update === false) return;
		} else {
			return;
		}

		if(botIDs[oldEmoji.guild.id].logs) {
            if(oldEmoji.name !== newEmoji.name) {
                const embed = new EmbedBuilder()
				    .setColor(embedColours.positive)
				    .setDescription("An emoji named "+oldEmoji.name+" was updated <:"+newEmoji.name+":"+oldEmoji.id+">.\nNew Name: "+newEmoji.name)
				    .setFooter({ text: 'oldEmoji ID '+oldEmoji.id })
				    .setTimestamp();
			    client.channels.cache.get(botIDs[oldEmoji.guild.id].logs).send({ embeds: [embed] });
			    return;
            }
		}
	},
};