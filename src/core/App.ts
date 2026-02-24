import { singleton } from "tsyringe"
import { DiscordClient } from "@/core/DiscordClient"
import { ConfigManager } from "@/core/managers/ConfigManager"
import { EventsManager } from "@/core/managers/EventsManager"
import { Logger } from "@/core/managers/LoggerManager"
import { CommandsManager } from "./managers/CommandsManager"

@singleton()
export class App {
  constructor(
    private readonly logger: Logger,
    private readonly config: ConfigManager,
    private readonly discordClient: DiscordClient,
    private readonly eventsManager: EventsManager,
    private readonly commandsManager: CommandsManager
  ) {}

  public async init(): Promise<void> {
    await this.eventsManager.init()
    await this.commandsManager.init()
    await this.discordClient.connect(this.config.token)

    this.logger.info(`App started as v${this.config.common.infos.version}`)
  }
}