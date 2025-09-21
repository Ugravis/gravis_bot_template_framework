import { EVENT_INTERACTIONS } from "../classes/decorators/EventInteraction"
import { Collection } from "discord.js"
import { BaseEvent } from "../classes/BaseEvent"
import { MyClient } from "../client/MyClient"
import Container from "typedi"

export class EventsManager {
  public events = new Collection<string, BaseEvent<any>>()

  constructor(private client: MyClient) {}

  public init() {
    for (const EventClass of EVENT_INTERACTIONS) {
      const event = Container.get<BaseEvent<any>>(EventClass)
      event.client = this.client
      this.events.set(event.name, event)
      console.log(`✅ Event loaded: ${event.name}`)
    }
  }
}