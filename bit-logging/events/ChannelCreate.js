const { EmbedBuilder, Events } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")
const channel_lookup = require("../index.js")

module.exports = {
	name: Events.ChannelCreate,
	execute(channel) {
		const client = channel.client
		if(logs[channel.guild.id]) {
			if(logs[channel.guild.id].channel.create === false) return;
		} else {
			return;
		}

		if(botIDs[channel.guild.id].logs) {
			var isThread = false;
	
			if(channel.type === 11 || channel.type === 12 || channel.type === 13)
			{
				isThread = true;
			}
	
			var categoryText
	
			if(channel.parent) {
				categoryText = " in "+channel.parent.name+' was created.'
			} else {
				categoryText = " was created."
			}
			
			const embed = new EmbedBuilder()
				.setColor(embedColours.positive)

				if(isThread) {
					embed.setDescription("A thread named "+channel.name)
				} else {
					embed.setDescription("A channel named "+channel.name+" of type "+channel_lookup[channel.type].name+categoryText)
				}
				
				embed.setFooter({ text: 'Channel ID '+channel.id })
				embed.setTimestamp();
			client.channels.cache.get(botIDs[channel.guild.id].logs).send({ embeds: [embed] });
			return;
		}
	}
}