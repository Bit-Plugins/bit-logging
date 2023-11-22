const { EmbedBuilder, Message, AttachmentBuilder } = require('discord.js');
const { embedColours, botIDs } = require('../config');

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		const client = member.client
		const user = member.user

		if(member.guild.id != botIDs.guild) {
			return;
		}

		const embed = new EmbedBuilder()
			.setColor(embedColours.main)
			.setDescription("A user named <@"+user.id+"> joined the server.")
			.setFooter({ text: 'User ID '+ user.id })
			.setTimestamp();
		client.channels.cache.get(botIDs.logs).send({ embeds: [embed] })
		return;
	}
}