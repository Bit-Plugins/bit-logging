const { EmbedBuilder } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")

module.exports = {
	name: 'roleCreate',
	execute(role) {
		const client = role.client
		if(logs[role.guild.id]) {
			if(logs[role.guild.id].role.create === false) return;
		} else {
			return;
		}

		if(botIDs[role.guild.id].logs) {
			const embed = new EmbedBuilder()
				.setDescription("A role named "+role.name+" was created. <@&"+role.id+">")
				
				if(role.color) {
					embed.setColor(role.color)
				} else {
					embed.setColor(embedColours.positive)
				}

				embed.setFooter({ text: 'Role ID '+ role.id})
				embed.setTimestamp();
			client.channels.cache.get(botIDs[role.guild.id].logs).send({ embeds: [embed] })
			return;
		}
	}
}