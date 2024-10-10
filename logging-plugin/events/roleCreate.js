const { EmbedBuilder } = require('discord.js');
const { embedColours, botIDs, logs } = require('../config.json');

module.exports = {
	name: 'roleCreate',
	execute(role) {
		const client = role.client
		if(logs.role.create === false) {
			return;
		}

		if(role.guild.id !== botIDs.guild) {
			return;
		}

		const embed = new EmbedBuilder()
			.setDescription("A role named "+role.name+" was created. <@&"+role.id+">")
			if(role.color) {
				embed.setColor(role.color)
			} else {
				embed.setColor(embedColours.positive)
			}
			embed.setFooter({ text: 'Role ID '+ role.id})
			embed.setTimestamp();
		client.channels.cache.get(botIDs.logs).send({ embeds: [embed] })
		return;
	}
}