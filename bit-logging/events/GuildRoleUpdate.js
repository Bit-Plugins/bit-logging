const { EmbedBuilder, Events } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")

module.exports = {
	name: Events.GuildRoleUpdate,
	execute(oldRole, newRole) {
		const client = newRole.client
		var ncolor = newRole.color
		var ocolor = oldRole.color
		var nhoist = newRole.hoist
		var ohoist = oldRole.hoist
		var nmentionable = newRole.mentionable
		var omentionable = oldRole.mentionable
		var npermissions = newRole.permissions.FLAGS
		var opermissions = oldRole.permissions.FLAGS
		var nemoji = newRole.unicodeEmoji
		var oemoji = oldRole.unicodeEmoji
		var nname = newRole.name
		var oname = oldRole.name

		if(logs[newRole.guild.id]) {
			if(logs[newRole.guild.id].role.update === false) return;
		} else {
			return;
		}

		if(botIDs[newRole.guild.id].logs) {
			if(ncolor !== ocolor || nhoist !== ohoist || nmentionable !== omentionable || nname !== oname || npermissions !== opermissions || nemoji !== oemoji) {
				const embed = new EmbedBuilder()
					.setDescription("A role "+newRole+" has been updated")
					if(nname !== oname) {
						embed.addFields(
							{ name: 'Old Name', value: oname, inline: true },
						)
					}

					if(ncolor !== ocolor) {
						if(ncolor) {
							embed.setColor(ncolor)
						} else {
							if(ocolor) {
								embed.setColor(ocolor)
							} else {
								embed.setColor(embedColours.neutral)
							}
						}
					} else {
						if(ocolor) {
							embed.setColor(ocolor)
						} else {
							embed.setColor(embedColours.neutral)
						}
					}

					if(nhoist !== ohoist) {
						if(!nhoist) {
							embed.addFields({ name: 'Hoisted?', value: "No", inline: true })
						} else {
							embed.addFields({ name: 'Hoisted?', value: "Yes", inline: true })
						}
					}

					if(nmentionable !== omentionable) {
						if(!nmentionable) {
							embed.addFields({ name: 'Mentionable?', value: "No", inline: true })
						} else {
							embed.addFields({ name: 'Mentionable?', value: "Yes", inline: true })
						}
						embed.addFields({ name: '\u200B', value: '\u200B', inline: true })
					} else {
						if(!nmentionable) {
							embed.addFields({ name: 'Is Mentionable?', value: "No", inline: true })
						} else {
							embed.addFields({ name: 'Is Mentionable?', value: "Yes", inline: true })
						}
						embed.addFields({ name: '\u200B', value: '\u200B', inline: true })
					}

					if(nemoji !== oemoji) {
						if(oemoji) {
							if(nemoji) {
								embed.addFields({ name: 'Emoji', value: nemoji, inline: true })
							} else {
								embed.addFields({ name: 'Emoji', value: 'None', inline: true })
							}
						} else if (nemoji) {
							embed.addFields({ name: 'Emoji', value: nemoji, inline: true })
						}
					}
					
					embed.setFooter({ text: 'Role ID '+ newRole.id })
					embed.setTimestamp();
				client.channels.cache.get(botIDs[newRole.guild.id].logs).send({ embeds: [embed] })
				return;
			}
		}
	}
}