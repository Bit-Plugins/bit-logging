const { EmbedBuilder, Events } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")

module.exports = {
	name: Events.InviteCreate,
	execute(invite) {
        const client = invite.client

		if(logs[invite.guild.id]) {
			if(logs[invite.guild.id].invite.create === false) return;
		} else {
			return;
		}

		if(botIDs[invite.guild.id].logs) {
			var currentDate = Date.now()
			currentDate = currentDate/1000
			var inviteEnd

			if(invite.maxAge !== 0 && invite.maxAge !== null) {
				inviteEnd = Math.floor(currentDate+invite.maxAge)
			}

			var inviter
		
			if(invite.inviter.displayName) {
		    	inviter = invite.inviter.displayName
			} else if(invite.inviter.username) {
			    inviter = invite.inviter.username
			} else {
		    	inviter = ""
			}

			const embed = new EmbedBuilder()
				.setColor(embedColours.positive)
				if(invite.maxAge === 0) {
					embed.setDescription("An infinite invite was created by "+inviter+", and has "+invite.maxUses+" max uses\nhttps://discord.gg/"+invite.code);
				} else {
					embed.setDescription("An invite was created by "+inviter+", it will end <t:"+inviteEnd+":R> and has "+invite.maxUses+" max uses\nhttps://discord.gg/"+invite.code);
				}

				embed.setTimestamp();
			client.channels.cache.get(botIDs[invite.guild.id].logs).send({ embeds: [embed] });
			return;
		}
	},
};