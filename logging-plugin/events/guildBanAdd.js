const { EmbedBuilder } = require('discord.js');
const { embedColours, botIDs, logs } = require('../config.json');

module.exports = {
	name: 'guildBanAdd',
	execute(ban) {
		const client = ban.client
		if(logs[ban.guild.id]) {
			if(logs[ban.guild.id].ban.create === false) return;
		} else {
			return;
		}

		if(botIDs[ban.guild.id].logs) {
			var banReason

			if(ban.reason) {
				banReason = ".\nFor "+ban.reason
			} else {
				banReason = "."
			}

			const embed = new EmbedBuilder()
				.setColor(embedColours.positive)
				.setDescription("A user named "+ban.user.username+" was banned"+banReason)
				.setTimestamp()
			client.channels.cache.get(botIDs[ban.guild.id].logs).send({ embeds: [embed] })
			return;
		}
	}
}