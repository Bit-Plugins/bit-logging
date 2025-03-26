const { EmbedBuilder, Events } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")
const channel_lookup = require("../index.js")

module.exports = {
	name: Events.ChannelDelete,
	execute(channel) {
		if(logs[channel.guild.id]) {
			if(logs[channel.guild.id].channel.delete === false) return;
		} else {
			return;
		}

		const client = channel.client

		if(botIDs[channel.guild.id].logs) {
			var isThread = false;

			if(channel.type === 11 || channel.type === 12 || channel.type === 13)
			{
				isThread = true;
			}

			var categoryText

			if(channel.parent) {
				categoryText = " in "+channel.parent.name+' was deleted.'
			} else {
				categoryText = " was deleted."
			}

			const embed = new EmbedBuilder()
				.setColor(embedColours.negative)
				
				if(isThread) {
					embed.setDescription("A thread "+channel.name)
				} else {
					embed.setDescription("A channel "+channel.name+" of type "+channel_lookup(channel.type)+categoryText)
				}

				embed.setFooter({ text: 'Channel ID '+channel.id })
				embed.setTimestamp();
			client.channels.cache.get(botIDs[channel.guild.id].logs).send({ embeds: [embed] });
			return;
		}
	}
}