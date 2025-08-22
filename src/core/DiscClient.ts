import { Client, GatewayIntentBits } from "discord.js";

export class DiscClient extends Client {
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

  async init(): Promise<void> {
    try {
      await this.login(
        process.env.NODE_ENV === 'development'
          ? process.env.DEV_BOT_TOKEN
          : process.env.PROD_BOT_TOKEN
      )
      console.log(`DiscBot connected`)

    } catch (err) {
      console.error(`Error on DiscBot login: `, err)
    }
  }
}