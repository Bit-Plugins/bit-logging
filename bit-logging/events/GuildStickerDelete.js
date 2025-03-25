const { EmbedBuilder, Events } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")

module.exports = {
	name: Events.GuildStickerDelete,
	execute(sticker) {
		if(logs[sticker.guild.id]) {
			if(logs[sticker.guild.id].sticker.delete === false) return;
		} else {
			return;
		}

		if(botIDs[sticker.guild.id].logs) {
        	const client = sticker.client
			const embed = new EmbedBuilder()
				.setColor(embedColours.negative)
				.setDescription("An Sticker named "+sticker.name+" was deleted.")
				.setFooter({ text: 'Sticker ID '+sticker.id })
				.setTimestamp();
			client.channels.cache.get(botIDs[sticker.guild.id].logs).send({ embeds: [embed] });
			return;
		}
	},
};