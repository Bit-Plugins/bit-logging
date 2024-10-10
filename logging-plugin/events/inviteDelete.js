const { EmbedBuilder } = require('discord.js');
const { embedColours, botIDs, logs } = require('../config.json');



module.exports = {
	name: 'inviteDelete',
	execute(invite) {

		if(logs.invite.delete === false) {
			return;
		}

		if(invite.guild.id != botIDs.guild) {
			return;
		}

        const client = invite.client
		const embed = new EmbedBuilder()
			.setColor(embedColours.negative)
			.setDescription("An invite was deleted.\nhttps://discord.gg/"+invite.code)
			.setTimestamp();
		client.channels.cache.get(botIDs.logs).send({ embeds: [embed] });
		return;
	},
};