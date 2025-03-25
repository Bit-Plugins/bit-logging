const { EmbedBuilder, Events } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")

module.exports = {
	name: Events.GuildEmojiDelete,
	execute(emoji) {
		if(logs[emoji.guild.id]) {
			if(logs[emoji.guild.id].emoji.delete === false) return;
		} else {
			return;
		}

		if(botIDs[emoji.guild.id].logs) {
        	const client = emoji.client
			const embed = new EmbedBuilder()
				.setColor(embedColours.negative)
				.setDescription("An emoji named "+emoji.name+" was deleted.")
				.setFooter({ text: 'Emoji ID '+emoji.id })
				.setTimestamp();
			client.channels.cache.get(botIDs[emoji.guild.id].logs).send({ embeds: [embed] });
			return;
		}
	},
};