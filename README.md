# Logging Plugin
A logging plugin created for Bit 2025.1

## Required modules
- None

## Installing
1) Please copy the bit-logging folder to your plugins folder.
2) Copy the bit-logging folder within the configs folder into your configs folder in Bit.
3) Update the config.json file in the configs/bit-logging folder. (Due to an issue we cannot automate this process!)

    3.a) Make sure to replace guildID in the botIDs and logs settings with the ID of your Discord Server!
   
    3.b) Make sure to also set the botIDs.guildID.logs setting to your Discord Servers logging channels ID!

## Required Intents
This plugin requires specific intents enabled within Bit. Please make sure to head to line 28 of your bit.js file and add the following intents (In order to make this easier we've added the commas for the end of each line)
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMembers,
GatewayIntentBits.GuildModeration,
GatewayIntentBits.GuildInvites,
GatewayIntentBits.MessageContent,

## Message logs not working right
To do anything with message content, the bot requires the MessageContent intent, this means going into your Discord Developer Dashboard, going to your application, then the bot section and enabling Message Content. Then going into the bots code, and edit the bit.js file to contain the following code under the client intents object `GatewayIntentBits.MessageContent`. This should be on a new line, and the previous intent should have a comma `,` at the end.

This intent is disabled by default to protect user data, and we cannot make the plugin enable this intent retroactively.
