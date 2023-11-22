const fs = require('fs');
const { EmbedBuilder } = require('discord.js');
const { embedColours } = require('../info');

module.exports = {
	name: 'messageCreate',
	execute(message) {
        const client = message.client
        const user = message.author.user
        const member = message.author
        const guild = message.guild
        if (!message.guild === botIDs.guild) return;

        if(message.type === 'GUILD_MEMBER_JOIN') {
            const embed = new EmbedBuilder()
                .setAuthor("Member Verified | "+message.member.user.username, message.member.user.avatarURL())
                .setColor(embedColours.positive)
                .setTimestamp()
                .setFooter('User ID '+ message.member.id)
                .setTimestamp();
            client.channels.cache.get(botIDs.logs).send({ embeds: [embed] });
        }
	},
};