import { Collection } from "discord.js";
import { DiscClient } from "./DiscClient";
import { BaseEvent } from "../events/BaseEvent";
import { readdirSync, statSync } from "fs";
import { join } from "path";

export class EventManager {
  private client: DiscClient
  private events = new Collection<string, BaseEvent>()

  constructor(client: DiscClient) {
    this.client = client
  }

  async loadAll(folderPath: string) {
    const entries = readdirSync(folderPath)

    for (const entry of entries) {
      const fullPath = join(folderPath, entry)
      const stats = statSync(fullPath)

      if (stats.isDirectory()) {
        await this.loadAll(fullPath)
      
      } else if (entry.endsWith("ts") || entry.endsWith("js")) {
        try {
          const { default: EventClass } = await import(fullPath)
          if (!EventClass) continue

          const instance: BaseEvent = new EventClass()
          if (!instance.name) continue

          this.events.set(instance.name, instance)
          console.log(`✅ Event loaded: ${instance.name}`)

          this.client.on(instance.name, async (...args: any[]) => {
            await this.dispatchEvent(instance, ...args)
          })

        } catch (err) {
          continue
        }
      }
    }
  }
  
  private async dispatchEvent(event: BaseEvent, ...args: any[]) {
    try {
      // this.beforeEvent... à faire plus tard
      const result = await event.execute(this.client, ...args)
      // this.afterEvent... à faire plus tard

    } catch (err) {
      console.error(`❌ Error during event ${event.name}`, err)
    }
  }
}