const { EmbedBuilder } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")

module.exports = {
	name: 'channelDelete',
	execute(channel) {
		if(logs[channel.guild.id]) {
			if(logs[channel.guild.id].channel.delete === false) return;
		} else {
			return;
		}

		const client = channel.client

		if(botIDs[channel.guild.id].logs) {
			const lookup = [
				{ value: 0, name: "Guild Text" },
				{ value: 1, name: "DM" },
				{ value: 2, name: "Voice" },
				{ value: 3, name: "Group DM" },
				{ value: 4, name: "Category" },
				{ value: 5, name: "Announcement" },
				{ value: 6, name: "Unknown" },
				{ value: 7, name: "Unknown" },
				{ value: 8, name: "Unknown" },
				{ value: 9, name: "Unknown" },
				{ value: 10, name: "Announcement Thread" },
				{ value: 11, name: "Public Thread" },
				{ value: 12, name: "Private Thread" },
				{ value: 13, name: "Stage" },
				{ value: 14, name: "Directory" },
				{ value: 15, name: "Forum" },
				{ value: 16, name: "Unknown"},
				{ value: 17, name: "Unknown"},
				{ value: 18, name: "Unknown"},
				{ value: 19, name: "Unknown"},
				{ value: 20, name: "Unknown"},
				{ value: 21, name: "Unknown"},
				{ value: 22, name: "Unknown"},
				{ value: 23, name: "Unknown"},
				{ value: 24, name: "Unknown"},
				{ value: 25, name: "Unknown"},
				{ value: 26, name: "Unknown"},
				{ value: 27, name: "Unknown"},
				{ value: 28, name: "Unknown"},
				{ value: 29, name: "Unknown"},
				{ value: 30, name: "Unknown"},
			];

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
					embed.setDescription("A thread named "+channel.name)
				} else {
					embed.setDescription("A channel named "+channel.name+" of type "+lookup[channel.type].name+categoryText)
				}

				embed.setFooter({ text: 'Channel ID '+channel.id })
				embed.setTimestamp();
			client.channels.cache.get(botIDs[channel.guild.id].logs).send({ embeds: [embed] });
			return;
		}
	}
}