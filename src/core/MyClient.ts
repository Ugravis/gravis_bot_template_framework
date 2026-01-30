import { Client, GatewayIntentBits } from "discord.js"
import { Service } from "typedi"

@Service()
export class MyClient extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences
      ]
    })
  }

  public async init() {
    await this.login(process.env.DEV_BOT_TOKEN)
    console.log(`✅ Logged in as ${this.user?.tag}`)
  }
}