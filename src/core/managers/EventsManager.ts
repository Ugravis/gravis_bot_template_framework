import { loadFoldersFiles } from "@/shared/utils/system/fileLoader";
import { AppContext } from "../AppContext"
import { DiscordClient } from "../DiscordClient"
import { BaseEvent } from "../classes/BaseEvent";

export class EventsManager {
  private registeredEvents: BaseEvent<any>[] = []

  constructor(
    private context: AppContext,
    private discordClient: DiscordClient
  ) {}

  public async init(): Promise<void> {
    const eventsPath = this.context.config.code.paths.eventsFeatures
    const eventClasses = await loadFoldersFiles<BaseEvent<any>>(eventsPath)

    for (const EventClass of eventClasses) {
      const instance = new EventClass(this.context)

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
      this.context.logger.info(`Event loaded: ${instance.name}`)
    }
    this.context.logger.info(`Total of ${this.registeredEvents.length} events loaded`)
  }

  public get loadedEvents() {
    return this.registeredEvents
  }
}