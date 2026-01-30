import { EVENT_INTERACTIONS } from "../classes/decorators/EventInteraction"
import { Collection, Guild } from "discord.js"
import { BaseEvent } from "../classes/BaseEvent"
import { MyClient } from "../client/MyClient"
import Container from "typedi"
import { loadFoldersFiles } from "@/shared/functions/system/readdingFiles"

export class EventsManager {
  public events = new Collection<string, BaseEvent<any>>()

  constructor(private client: MyClient) {}

  public async init(eventsPath: string): Promise<void> {
    await loadFoldersFiles(eventsPath)

    for (const EventClass of EVENT_INTERACTIONS) {
      const event = Container.get<BaseEvent<any>>(EventClass)
      event.client = this.client
      this.events.set(event.name, event)
      console.log(`✅ Event loaded: ${event.name}`)
    }
  }

  public async getRessources(
    eventName: string,
    eventData: any
  ): Promise<any> {
    
    const guild: Guild | undefined = eventData.name ? eventData : eventData.guild

    // this.client.db.servicesManager.services.guild.findById(guild?.id)
  }
}