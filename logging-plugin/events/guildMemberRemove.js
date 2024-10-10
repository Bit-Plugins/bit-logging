const { EmbedBuilder } = require('discord.js');
const { embedColours, botIDs, logs } = require('../config.json');

module.exports = {
	name: 'guildMemberRemove',
	execute(member) {
		const client = member.client
		const user = member.user
		if(logs.member.remove === false) {
			return;
		}

		if(member.guild.id != botIDs.guild) {
			return;
		}

		const embed = new EmbedBuilder()
			.setColor(embedColours.negative)
			.setDescription("A user named <@"+user.id+"> left the server.")
			.setTimestamp();
		client.channels.cache.get(botIDs.logs).send({ embeds: [embed] })
		return;
	}
}