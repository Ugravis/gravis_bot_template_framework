import { Client, GatewayIntentBits } from "discord.js";
import { singleton } from "tsyringe";
import { ConfigManager } from "./managers/ConfigManager";

@singleton()
export class DiscordClient {
  public readonly clientInstance: Client

  constructor(
    private readonly config: ConfigManager
  ) {
    this.clientInstance = new Client({
      intents: config.common.discordSystem.intents
    })
  }

  public async connect(token: string): Promise<void> {
    await this.clientInstance.login(token)
  }

  public async destroy(): Promise<void> {
    this.clientInstance.destroy()
  }
}