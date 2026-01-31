import { Client as DiscordClient, Events, GatewayIntentBits } from "discord.js"

export class Client {
  private readonly client: DiscordClient
  private isConnected: boolean = false

  constructor() {
    this.client = new DiscordClient({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences
      ]
    })
  }

  public async connect(): Promise<void> {
    await this.client.login(process.env.DEV_BOT_TOKEN)
  }

  public async disconnect(): Promise<void> {
    if (this.isConnected) {
      this.client.destroy()
      this.isConnected = false
    }
  }

  public getNativeClient(): DiscordClient {
    return this.client
  }
}