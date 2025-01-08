# Logging Plugin
A logging plugin created for Bit 2025.1

## Required modules
- None

## Installing
1) Please copy the logging-plugin folder to your plugins folder.
2) Copy the logging-plugin folder within the configs folder into your configs folder in Bit.
3) Update the config.json file in the configs/logging-plugin folder. (Due to an issue we cannot automate this process!)
    3.a) Make sure to replace guildID in the botIDs and logs settings with the ID of your Discord Server!
    3.b) Make sure to also set the botIDs.guildID.logs setting to your Discord Servers logging channels ID!

## Message logs not working right
To do anything with message content, the bot requires the MessageContent intent, this means going into your Discord Developer Dashboard, going to your application, then the bot section and enabling Message Content. Then going into the bots code, and edit the bit.js file to contain the following code under the client intents object `GatewayIntentBits.MessageContent`. This should be on a new line, and the previous intent should have a comma `,` at the end.

This intent is disabled by default to protect user data, and we cannot make the plugin enable this intent retroactively.