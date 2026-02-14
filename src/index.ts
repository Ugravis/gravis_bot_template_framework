import dotenv from 'dotenv'
import { Client, Events, GatewayIntentBits } from 'discord.js'

dotenv.config({ quiet: true })

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, (client: Client) => {
	console.log(`Ready! as ${client.user?.tag}`)
})

client.login(process.env.DEV_BOT_TOKEN)