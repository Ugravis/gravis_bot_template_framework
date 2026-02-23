import { loadFoldersFiles } from "@/shared/utils/system/fileLoader";
import { DiscordClient } from "@/core/DiscordClient"
import { BaseEvent } from "@/core/classes/BaseEvent";
import { container, singleton } from "tsyringe";
import { Logger } from "@/core/managers/LoggerManager";
import { ConfigManager } from "@/core/managers/ConfigManager";

@singleton()
export class EventsManager {
  private registeredEvents: BaseEvent<any>[] = []

  constructor(
    private readonly logger: Logger,
    private readonly config: ConfigManager,
    private readonly discordClient: DiscordClient
  ) {}

  public async init(): Promise<void> {
    const eventsPath = this.config.code.paths.eventsFeatures
    const eventClasses = await loadFoldersFiles<BaseEvent<any>>(eventsPath)

    for (const EventClass of eventClasses) {
      const instance = container.resolve(EventClass)

      if (!(instance instanceof BaseEvent)) continue

      const client = this.discordClient.clientInstance

      if (instance.once) {
        client.once(instance.name, (...args) => 
          instance.execute(...args)
        )
      } else {
        client.on(instance.name, (...args) =>
          instance.execute(...args)
        )
      }
      
      this.registeredEvents.push(instance)
      this.logger.info(`Event loaded: ${instance.name}`)
    }
    this.logger.info(`Total of ${this.registeredEvents.length} events loaded`)
  }

  public get loadedEvents() {
    return this.registeredEvents
  }
}