const { EmbedBuilder, Events } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")

module.exports = {
	name: Events.GuildStickerCreates,
	execute(sticker) {
        const client = sticker.client

		if(logs[sticker.guild.id]) {
			if(logs[sticker.guild.id].sticker.create === false) return;
		} else {
			return;
		}

		if(botIDs[sticker.guild.id].logs) {
			const embed = new EmbedBuilder()
				.setColor(embedColours.positive)
				.setDescription("A sticker named "+sticker.name+" was created. Due to an issue I cannot send a preview of the sticker.")
				.setFooter({ text: 'sticker ID '+sticker.id })
				.setTimestamp();
			client.channels.cache.get(botIDs[sticker.guild.id].logs).send({ embeds: [embed] });
			return;
		}
	},
};