const { EmbedBuilder, Events } = require('discord.js');
const { embedColours, botIDs, logs } = require("../../../configs/bit-logging/config.json")

module.exports = {
	name: Events.GuildMemberUpdate,
	execute(oldMember, newMember) {
		const client = oldMember.client
		if(logs[oldMember.guild.id]) {
			if(logs[oldMember.guild.id].member.verified === false) return;
		} else {
			return;
		}

		if(botIDs[oldMember.guild.id].logs) {
            if(oldMember.pending === true && newMember.pending === false) {
                const embed = new EmbedBuilder()
                    .setAuthor("Member Verified | "+oldMember.user.username, oldMember.user.avatarURL())
                    .setDescription("A user named <@"+oldMember.id+"> has gone through the user verification system.")
                    .setColor(embedColours.positive)
                    .setTimestamp()
                    .setFooter('User ID '+ oldMember.id)
                client.channels.cache.get(botIDs[oldMember.guild.id].logs).send({ embeds: [embed] });
			    return;
            }
		}
	}
}