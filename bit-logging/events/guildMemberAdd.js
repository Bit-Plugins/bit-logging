const { EmbedBuilder, Message, AttachmentBuilder } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		const client = member.client
		const user = member.user
		if(logs[member.guild.id]) {
			if(logs[member.guild.id].member.add === false) return;
		} else {
			return;
		}

		if(botIDs[member.guild.id].logs) {
			const embed = new EmbedBuilder()
				.setColor(embedColours.main)
				.setDescription("A user named <@"+user.id+"> joined the server.")
				.setFooter({ text: 'User ID '+ user.id })
				.setTimestamp();
			client.channels.cache.get(botIDs[member.guild.id].logs).send({ embeds: [embed] })
			return;
		}
	}
}