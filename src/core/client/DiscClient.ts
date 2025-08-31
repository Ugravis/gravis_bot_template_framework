import { Client, Collection, GatewayIntentBits } from "discord.js";
import { BaseSlashCommand } from "../interactions/BaseSlashCommand";
import { BaseButtonCommand } from "../interactions/BaseButtonCommand";
import { BaseModalSubmitCommand } from "../interactions/BaseModalSubmitCommand";
import { BaseClassicCommand } from "../interactions/BaseClassicCommand";
import { readdirSync, statSync } from "fs";
import { join } from "path";
import { BaseEvent } from "../events/BaseEvent";

export class DiscClient extends Client {
  public events = new Collection<string, BaseEvent>()
  public slashCommands = new Collection<string, BaseSlashCommand>()
  public buttonCommands = new Collection<string, BaseButtonCommand>()
  public modalSubmitCommands = new Collection<string, BaseModalSubmitCommand>()
  public classicCommands = new Collection<string, BaseClassicCommand>()

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences
      ]
    })
  }

  async init(): Promise<void> {
    try {
      await this.loadInteractions(join(__dirname, '../../features'))
      await this.loadEvents(join(__dirname, '../../events'))

      await this.login(
        process.env.NODE_ENV === 'development'
          ? process.env.DEV_BOT_TOKEN
          : process.env.PROD_BOT_TOKEN
      )
      console.log(`✅ DiscBot connected`)

    } catch (err) {
      console.error(`❌ Error on DiscBot login: `, err)
    }
  }

  private async loadEvents(folderPath: string) {
    const entries = readdirSync(folderPath)

    for (const entry of entries) {
      const fullPath = join(folderPath, entry)
      const stats = statSync(fullPath)

      if (stats.isDirectory()) {
        await this.loadEvents(fullPath)
      
      } else if (entry.endsWith("ts") || entry.endsWith("js")) {
        try {
          const { default: EventClass } = await import(fullPath)
          if (!EventClass) continue

          const instance: BaseEvent = new EventClass()
          if (!instance.name) continue

          this.events.set(instance.name, instance)
          console.log(`✅ Event loaded: ${instance.name}`)

          this.on(instance.name, async (...args: any[]) => {
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
      const result = await event.execute(this, ...args)
      // this.afterEvent... à faire plus tard

    } catch (err) {
      console.error(`❌ Error during event ${event.name}`, err)
    }
  }

  private async loadInteractions(folderPath: string) {
    const entries = readdirSync(folderPath)

    for (const entry of entries) {
      const fullPath = join(folderPath, entry)
      const stats = statSync(fullPath)

      if (stats.isDirectory()) {
        await this.loadInteractions(fullPath)

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