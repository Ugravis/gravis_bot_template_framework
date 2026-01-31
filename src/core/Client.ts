import { Client as DiscordClient, Events, GatewayIntentBits } from "discord.js"
import { ConfigManager } from "./managers/ConfigManager"

export class Client {
  private readonly client: DiscordClient
  private isConnected: boolean = false

  constructor(
    private readonly config: ConfigManager
  ) {
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
    await this.client.login(
      this.config.isProduction 
        ? process.env.PROD_BOT_TOKEN 
        : process.env.DEV_BOT_TOKEN
    )
    this.isConnected = true
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