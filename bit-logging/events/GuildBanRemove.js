const { EmbedBuilder, Events } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")

module.exports = {
	name: Events.GuildBanRemove,
	execute(ban) {
		const client = ban.client
		if(logs[ban.guild.id]) {
			if(logs[ban.guild.id].ban.delete === false) return;
		} else {
			return;
		}

		if(botIDs[ban.guild.id].logs) {
			var banReason

			if(ban.reason) {
				banReason = " they were originally banned for "+ban.reason
			} else {
				banReason = "."
			}

			const embed = new EmbedBuilder()
				.setColor(embedColours.negative)
				.setDescription("A user: "+ban.user+" was unbanned"+banReason)
				.setTimestamp()
				.setFooter({ text: 'Ban ID '+'Currently Unavailable' })
			client.channels.cache.get(botIDs[ban.guild.id].logs).send({ embeds: [embed] })
			return;
		}
	}
}