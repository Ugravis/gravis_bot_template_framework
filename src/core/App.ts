import { AppContext } from "./AppContext";
import { DiscordClient } from "./DiscordClient";
import { ConfigManager } from "./managers/ConfigManager";
import { Logger } from "./managers/LoggerManager";

export class App {
  private discordClient: DiscordClient
  private context!: AppContext

  constructor() {
    this.discordClient = new DiscordClient()
  }

  public async init(): Promise<void> {
    const logger = new Logger()
    const config = new ConfigManager()

    this.context = {
      logger,
      config
    }

    await this.discordClient.connect(this.context.config.token)

    this.context.logger.info(`App started as v${this.context.config.common.infos.version}`)
  }
}