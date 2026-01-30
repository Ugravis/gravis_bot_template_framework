import dotenv from 'dotenv'
dotenv.config({ quiet: true })

import { Client, Events, GatewayIntentBits } from 'discord.js'

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences
  ] 
})

client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})

client.login(process.env.DEV_BOT_TOKEN)