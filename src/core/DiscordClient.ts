import { Client, GatewayIntentBits } from "discord.js";

export class DiscordClient {
  public readonly clientInstance: Client

  constructor() {
    this.clientInstance = new Client({
      intents: [
        GatewayIntentBits.Guilds
      ]
    })
  }

  public async connect(token: string): Promise<void> {
    await this.clientInstance.login(token)
  }
}