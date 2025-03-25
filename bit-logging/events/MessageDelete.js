const { EmbedBuilder, Events } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")

module.exports = {
	name: Events.MessageDelete,
	execute(message) {
		const client = message.client
		if(logs[message.guild.id]) {
			if(logs[message.guild.id].message.delete === false) return;
		} else {
			return;
		}

		if(botIDs[message.guild.id].logs) {
			const embed0 = new EmbedBuilder()
				.setColor(embedColours.negative)
				.setDescription("A message by "+message.author+" in "+message.channel+" was deleted")

				if(message.cleanContent.length > 1024) {
					embed0.addFields({name: 'Content', value: 'Message Content is over 1024 lines, it\'s in a new embed', inline: false })
				} else if(message.cleanContent.length > 1) {
					embed0.addFields({ name: 'Content', value: message.cleanContent, inline: false })
				} else {
					embed0.addFields({ name: 'Content', value: 'Message Content was not cached so it cannot be displayed', inline: false })
				}

				embed0.setTimestamp();
			client.channels.cache.get(botIDs[message.guild.id].logs).send({ embeds: [embed0] })
			if(message.cleanContent.length > 1024) {
				const embed1 = new EmbedBuilder()
					.setTitle("Message Deleted | Message Content")
					.setColor(embedColours.negative)
					.setDescription(message.cleanContent)
					.setTimestamp();
				client.channels.cache.get(botIDs[message.guild.id].logs).send({ embeds: [embed1] })
			}
			return;
		}
	}
}