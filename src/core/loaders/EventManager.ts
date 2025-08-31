import { Collection } from "discord.js";
import { BaseEvent } from "../baseClasses/BaseEvent";
import { readdirSync, statSync } from "fs";
import { join } from "path";

export class EventManager {
  public events = new Collection<string, BaseEvent>()

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

        } catch (err) {
          continue
        }
      }
    }
  }
}