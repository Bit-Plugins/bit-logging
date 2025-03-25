const { EmbedBuilder, Events } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")
const channel_lookup = require("../index.js")

module.exports = {
	name: Events.ChannelUpdate,
	execute(oldChannel, newChannel) {
		if(logs[newChannel.guild.id]) {
			if(logs[newChannel.guild.id].channel.update === false) return;
		} else {
			return;
		}

		if(botIDs[newChannel.guild.id].logs) {
			const client = newChannel.client

			var nname = newChannel.name
			var oname = oldChannel.name

			var ntype = newChannel.type.toString()
			var otype = oldChannel.type.toString()
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
				categoryText = " in "+newChannel.parent+' was edited.'
			} else {
				categoryText = " was edited."
			}

			if( nname !== oname || nparent !== oparent || ntype !== otype ) {
				const embed = new EmbedBuilder()
					.setColor(embedColours.neutral)
					.setDescription('A channel '+oldChannel+' of type '+oldChannel.type+categoryText)

				if(newChannel.name) {
					embed.addFields(
						{ name: 'Old Name', value: oname, inline: true },
					)
				}

				if(newChannel.parent.name) {
					embed.addFields(
						{ name: 'New Category', value: nparent, inline: true },
					)
				}

				if(newChannel.type) {
					embed.addFields(
						{ name: 'New Type', value: channel_lookup(ntype), inline: true },
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