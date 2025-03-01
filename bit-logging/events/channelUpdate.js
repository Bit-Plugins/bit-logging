const { EmbedBuilder } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")

module.exports = {
	name: 'channelUpdate',
	execute(oldChannel, newChannel) {
		if(logs[newChannel.guild.id]) {
			if(logs[newChannel.guild.id].channel.edit === false) return;
		} else {
			return;
		}

		if(botIDs[newChannel.guild.id].logs) {
			const client = newChannel.client

			var nname = newChannel.name
			var oname = oldChannel.name

			var ntype = newChannel.type.toString()
			var otype = oldChannel.type.toString()

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
				{ value: 10, name: "Announcement" },
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
			var nparent
			var oparent

			if(newChannel.type !== 4 && newChannel.parent) {
				if(newChannel.parent.name) {
					nparent = newChannel.parent.name
				}
			}

			if(oldChannel.type !== 4 && oldChannel.parent) {
				if(oldChannel.parent.name) {
					oparent = oldChannel.parent.name
				}
			}

			var isThread = false;

			if(newChannel.type === 11 || newChannel.type === 12)
			{
				isThread = true;
			}

			var categoryText

			if(newChannel.parent) {
				categoryText = " in "+newChannel.parent.name+' was edited.'
			} else {
				categoryText = " was edited."
			}

			if( nname !== oname || nparent !== oparent || ntype !== otype ) {
				const embed = new EmbedBuilder()
					.setColor(embedColours.neutral)
					.setDescription('A channel '+oldChannel.name+' of type '+oldChannel.type+categoryText)

				if(newChannel.name) {
					embed.addFields(
						{ name: 'New Name', value: nname, inline: true },
					)
				}

				if(newChannel.parent.name) {
					embed.addFields(
						{ name: 'New Category', value: nparent, inline: true },
					)
				}

				if(newChannel.type) {
					embed.addFields(
						{ name: 'New Type', value: lookup[ntype].name, inline: true },
					)
				}
				
				embed.setFooter({ text: 'Channel ID '+newChannel.id})
				embed.setTimestamp();
				client.channels.cache.get(botIDs[newChannel.guild.id].logs).send({ embeds: [embed] });
				return;
			}
		}
	}
}