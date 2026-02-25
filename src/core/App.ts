import { singleton } from "tsyringe"
import { DiscordClient } from "@/core/DiscordClient"
import { ConfigManager } from "@/core/managers/ConfigManager"
import { EventsManager } from "@/core/managers/EventsManager"
import { Logger } from "@/core/managers/LoggerManager"
import { CommandsManager } from "./managers/CommandsManager"
import { DatabaseManager } from "./managers/DatabaseManager"
import { LifecycleManager } from "./managers/LifeCycleManager"
import { version } from '../../package.json'

@singleton()
export class App {
  constructor(
    private readonly lifeCycleManager: LifecycleManager,
    private readonly logger: Logger,
    private readonly config: ConfigManager,
    private readonly discordClient: DiscordClient,
    private readonly database: DatabaseManager,
    private readonly eventsManager: EventsManager,
    private readonly commandsManager: CommandsManager
  ) {}

  public async init(): Promise<void> {
    this.lifeCycleManager.register()
    await this.database.init()
    await this.eventsManager.init()
    await this.commandsManager.init()
    await this.discordClient.connect(this.config.getEnvVar('BOT_TOKEN'))

    this.logger.info(`App started as v${version}`)
  }
}