import { Collection } from "discord.js";
import { DiscClient } from "../client/DiscClient";
import { BaseSlashCommand } from "../baseClasses/BaseSlashCommand";
import { BaseButtonCommand } from "../baseClasses/BaseButtonCommand";
import { BaseModalSubmitCommand } from "../baseClasses/BaseModalSubmitCommand";
import { BaseClassicCommand } from "../baseClasses/BaseClassicCommand";
import { readdirSync, statSync } from "fs";
import { join } from "path";

export class InteractionManager {
  public slashCommands = new Collection<string, BaseSlashCommand>()
  public buttonCommands = new Collection<string, BaseButtonCommand>()
  public modalSubmitCommands = new Collection<string, BaseModalSubmitCommand>()
  public classicCommands = new Collection<string, BaseClassicCommand>()

  async loadAll(folderPath: string) {
    const entries = readdirSync(folderPath)

    for (const entry of entries) {
      const fullPath = join(folderPath, entry)
      const stats = statSync(fullPath)

      if (stats.isDirectory()) {
        await this.loadAll(fullPath)

      } else if (entry.endsWith('.ts') || entry.endsWith(".js")) {
        try {
          const { default: InteractionClass } = await import(fullPath)
          if (!InteractionClass) continue

          const instance = new InteractionClass()
          if (!("type" in instance) || !("name" in instance)) continue

          switch (instance.type) {
            case "slashCommand":
              this.slashCommands.set(instance.name, instance)
              console.log(`✅ Slash cmd loaded: ${instance.name}`)
              break
            case "button":
              this.buttonCommands.set(instance.name, instance)
              console.log(`✅ Button cmd loaded: ${instance.name}`)
              break
            case "modalSubmit":
              this.modalSubmitCommands.set(instance.name, instance)
              console.log(`✅ Modal submit cmd loaded: ${instance.name}`)
              break
            case "ClassicCommand":
              this.classicCommands.set(instance.name, instance)
              console.log(`✅ Classic cmd loaded: ${instance.name}`)
              break
          }

        } catch (err) {
          console.warn(`⚠️ Skipping interaction ${fullPath}`, err)
        }
      }
    }
  }
}