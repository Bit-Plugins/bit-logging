const { EmbedBuilder, Events } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")

module.exports = {
	name: Events.ChannelPinsUpdate,
	execute(channel) {
		const client = channel.client
		if(logs[channel.guild.id]) {
			if(logs[channel.guild.id].message.pinned === false) return;
		} else {
			return;
		}

		if(botIDs[channel.guild.id].logs) {
			const embed = new EmbedBuilder()
				.setColor(embedColours.neutral)
				.setDescription("A message in "+channel.name+" has been pinned.")
				.setTimestamp()
			client.channels.cache.get(botIDs[channel.guild.id].logs).send({ embeds: [embed] })
			return;
		}
	}
}