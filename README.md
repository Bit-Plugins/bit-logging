# Logging Plugin
A logging plugin created for Bit 2024.1.1

## Required modules
- None

## Message logs not working right
To do anything with message content, the bot requires the MessageContent intent, this means going into your Discord Developer Dashboard, going to your application, then the bot section and enabling Message Content. Then going into the bots code, and edit the bit.js file to contain the following code under the client intents object `GatewayIntentBits.MessageContent`. This should be on a new line, and the previous intent should have a comma `,` at the end.

This intent is disabled by default to protect user data, and we cannot make the plugin enable this intent retroactively.