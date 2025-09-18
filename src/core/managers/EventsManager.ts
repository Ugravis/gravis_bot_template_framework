import { Collection } from "discord.js"
import { readdirSync, statSync } from "fs"
import { join } from "path"
import { BaseEvent } from "../classes/BaseEvent"

export class EventsManager {
  public events = new Collection<string, BaseEvent>()

  async loadAll(folderPath: string) {
    const entries = readdirSync(folderPath)

    for (const entry of entries) {
      const fullPath = join(folderPath, entry)
      const stats = statSync(fullPath)

      if (stats.isDirectory()) {
        await this.loadAll(fullPath)

      } else if (entry.endsWith('.ts') || entry.endsWith(".js")) {
        try {
          const { default: EventClass } = await import(fullPath)

          if (!EventClass) continue
          if (!(EventClass.prototype instanceof BaseEvent)) continue

          const event: BaseEvent = new EventClass()

          this.events.set(event.name, event)
          console.log(`✅ Event loaded: ${event.name}`)

        } catch (err) {
          console.warn(`⚠️  Skipping event ${fullPath}`, err)
        }
      }
    }
  }
}