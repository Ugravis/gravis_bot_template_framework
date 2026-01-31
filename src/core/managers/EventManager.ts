import { Container } from "typedi"
import { BaseEvent } from "@/core/classes/BaseEvent"
import { filesDiscovery } from "@/shared/functions/system/filesDiscovery"
import { DISCORD_EVENT_METADADA } from "../classes/decorators/DiscordEventDecorator"
import { ClientEvents, Client } from "discord.js"

export class EventManager {
  private readonly registeredEvents: Map<string, BaseEvent<any>> = new Map()

  constructor(private readonly client: Client) {}

  public async init(): Promise<void> {
    await filesDiscovery('/src/features')
    
    for(const EventClass of DISCORD_EVENT_METADADA) {
      await this.registerEvent(EventClass)
    }
    console.log(`✅ ${this.registeredEvents.size} events registered`)
  }

  private async registerEvent(
    EventClass: new (...args: any[]) => BaseEvent<any>
  ): Promise<void> {
    try {
      const eventInstance = Container.get<BaseEvent<any>>(EventClass)
      const eventName = eventInstance.name
      const isOnce = eventInstance.once

      if (isOnce) this.client.once(eventName, (...args) => eventInstance.execute(...args))
      else this.client.on(eventName, (...args) => eventInstance.execute(...args))

      this.registeredEvents.set(eventName, eventInstance)
    
    } catch(e) {
      console.error(`❌ Failed to register event from class ${EventClass.name}:`, e)
    }
  }

  public getEvent<K extends keyof ClientEvents>(
    name:K
  ): BaseEvent<K> | undefined {
    return this.registeredEvents.get(name)
  }

  public listEvents(): string[] {
    return Array.from(this.registeredEvents.keys())
  }
}