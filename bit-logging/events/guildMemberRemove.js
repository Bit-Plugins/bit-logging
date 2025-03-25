const { EmbedBuilder, Events } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")

module.exports = {
	name: Events.GuildMemberRemove,
	execute(member) {
		const client = member.client
		const user = member.user
		if(logs[member.guild.id]) {
			if(logs[member.guild.id].member.remove === false) return;
		} else {
			return;
		}

		if(botIDs[member.guild.id].logs) {
			const embed = new EmbedBuilder()
				.setColor(embedColours.negative)
				.setDescription("A user named <@"+user.id+"> left the server.")
				.setTimestamp();
			client.channels.cache.get(botIDs[member.guild.id].logs).send({ embeds: [embed] })
			return;
		}
	}
}