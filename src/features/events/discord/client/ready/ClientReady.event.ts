import { BaseEvent } from "@/core/classes/BaseEvent"
import { CommandsManager } from "@/core/managers/CommandsManager"
import { ConfigManager } from "@/core/managers/ConfigManager"
import { Logger } from "@/core/managers/LoggerManager"
import { DiscordUtils } from "@/shared/utils/discord/DiscordUtils"
import { Client, Events, SendableChannels } from "discord.js"
import { injectable } from "tsyringe"
import { clientReadyComponent } from "./components/clientReady.components"
import { EventsManager } from "@/core/managers/EventsManager"
import { DatabaseManager } from "@/core/managers/DatabaseManager"

@injectable()
export default class ClientReady extends BaseEvent<Events.ClientReady> {
  public readonly name = Events.ClientReady
  public readonly once = true

  constructor(
    private readonly logger: Logger,
    private readonly discordUtils: DiscordUtils,
    private readonly config: ConfigManager,
    private readonly commandsManager: CommandsManager,
    private readonly eventsManager: EventsManager,
    private readonly databaseManager: DatabaseManager
  ) {
    super()
  }

  public async execute(client: Client<true>): Promise<void> {
    client.user.setPresence(this.config.env.presence)

    await this.commandsManager.registerSlashCommands()

    await this.discordUtils.sendClientConfigMessage(
      this.config.env.discordLogChannels.app, 
      { 
        components: [clientReadyComponent(
          client, 
          this.eventsManager.loadedEvents.length, 
          this.commandsManager.loadedCommands.size,
          this.databaseManager.dbName
        )]
      }
    )

    this.logger.info(`${client.user.tag} (id: ${client.user.id}): ${this.name} event`)
  }
}