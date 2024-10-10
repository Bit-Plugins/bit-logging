const { EmbedBuilder } = require('discord.js');
const { embedColours, botIDs, logs } = require('../config.json');

module.exports = {
	name: 'inviteDelete',
	execute(invite) {
		if(logs[invite.guild.id]) {
			if(logs[invite.guild.id].invite.delete === false) return;
		} else {
			return;
		}

		if(botIDs[invite.guild.id].logs) {
        	const client = invite.client
			const embed = new EmbedBuilder()
				.setColor(embedColours.negative)
				.setDescription("An invite was deleted.\nhttps://discord.gg/"+invite.code)
				.setTimestamp();
			client.channels.cache.get(botIDs[invite.guild.id].logs).send({ embeds: [embed] });
			return;
		}
	},
};