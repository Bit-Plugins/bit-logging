const { EmbedBuilder, Message, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")

module.exports = {
	name: 'messageUpdate',
	execute(oldMessage, newMessage) {
		const client = newMessage.client

		if(logs[newMessage.guild.id]) {
			if(logs[newMessage.guild.id].message.edit === false) return;
		} else {
			return;
		}
		
		if(botIDs[newMessage.guild.id].logs) {
    		if(newMessage.content == oldMessage.content) return;
    		if(!oldMessage.content) return;
    		if(!newMessage.content) return;

			const row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setLabel('Jump To Message')
						.setStyle(ButtonStyle.Link)
						.setURL(newMessage.url)
				)
			const embed0 = new EmbedBuilder()
				.setColor(embedColours.neutral)
				.setDescription("A message by <@"+oldMessage.author.id+"> in <#"+newMessage.channel.id+"> was edited.")

				if(newMessage.cleanContent.length > 1024) {
					embed0.addFields({ name: 'Content', value: 'Content is over 1024 lines, it\'s in a new embed'})
				} else if(newMessage.cleanContent.length > 1) {
					embed0.addFields({ name: 'Content', value: newMessage.cleanContent })
				} else {
					embed0.addFields({ name: 'Content', value: 'Message content was not cached so it cannot be displayed'})
				}

				embed0.setTimestamp();
			client.channels.cache.get(botIDs[newMessage.guild.id].logs).send({ embeds: [embed0], components: [row] })
			if(newMessage.cleanContent.length > 1024) {
				const embed2 = new EmbedBuilder()
					.setTitle("Message Content")
					.setColor(embedColours.neutral)
					.setDescription(newMessage.cleanContent)
					.setTimestamp();
				client.channels.cache.get(botIDs[newMessage.guild.id].logs).send({ embeds: [embed2] })
			}
			return;
		}
	}
}