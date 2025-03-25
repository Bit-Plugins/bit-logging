const { EmbedBuilder, Events } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")

module.exports = {
	name: Events.GuildRoleDelete,
	execute(role) {
		const client = role.client
		if(logs[role.guild.id]) {
			if(logs[role.guild.id].role.delete === false) return;
		} else {
			return;
		}

		if(botIDs[role.guild.id].logs) {
			const embed = new EmbedBuilder()
				.setDescription("A role named "+role.name+" was deleted.")
				
				if(role.color) {
					embed.setColor(role.color)
				} else {
					embed.setColor(embedColours.negative)
				}

				embed.setFooter({ text: 'Role ID '+ role.id })
				embed.setTimestamp();
			client.channels.cache.get(botIDs[role.guild.id].logs).send({ embeds: [embed] })
			return;
		}
	}
}