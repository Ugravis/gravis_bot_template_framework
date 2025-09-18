import { Collection, InteractionType } from "discord.js"
import { BaseSlashCommand } from "../classes/BaseSlashCommand"
import { readdirSync, statSync } from "fs"
import { join } from "path"
import { BaseInteraction } from "../classes/BaseInteraction"
import { MyClient } from "../client/MyClient"

export class InteractionsManager {
  public slashCommands = new Collection<string, BaseSlashCommand>()

  constructor(private client: MyClient) {}

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
          if (!(InteractionClass.prototype instanceof BaseInteraction)) continue

          const interaction: BaseInteraction = new InteractionClass()
          interaction.client = this.client

          switch (interaction.type) {
            case InteractionType.ApplicationCommand:
              const slashCommandInteraction = interaction as BaseSlashCommand
              this.slashCommands.set(slashCommandInteraction.name, slashCommandInteraction)
              console.log(`✅ Slash cmd loaded: ${slashCommandInteraction.name}`)
              break
            // case "button":
            //   this.buttonCommands.set(instance.name, instance)
            //   console.log(`✅ Button cmd loaded: ${instance.name}`)
            //   break
            // case "modalSubmit":
            //   this.modalSubmitCommands.set(instance.name, instance)
            //   console.log(`✅ Modal submit cmd loaded: ${instance.name}`)
            //   break
            // case "ClassicCommand":
            //   this.classicCommands.set(instance.name, instance)
            //   console.log(`✅ Classic cmd loaded: ${instance.name}`)
            //   break
          }

        } catch (err) {
          console.warn(`⚠️  Skipping interaction ${fullPath}`, err)
        }
      }
    }
  }
}