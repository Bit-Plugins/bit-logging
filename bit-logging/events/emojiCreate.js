const { EmbedBuilder } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")

module.exports = {
	name: 'emojiCreate',
	execute(emoji) {
        const client = emoji.client

		if(logs[emoji.guild.id]) {
			if(logs[emoji.guild.id].emoji.create === false) return;
		} else {
			return;
		}

		if(botIDs[emoji.guild.id].logs) {
			const embed = new EmbedBuilder()
				.setColor(embedColours.positive)
				.setDescription("An emoji named "+emoji.name+" was created <:"+emoji.name+":"+emoji.id+">")
				.setFooter({ text: 'Emoji ID '+emoji.id })
				.setTimestamp();
			client.channels.cache.get(botIDs[emoji.guild.id].logs).send({ embeds: [embed] });
			return;
		}
	},
};