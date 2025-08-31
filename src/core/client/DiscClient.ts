import { Client, GatewayIntentBits } from "discord.js"
import { InteractionManager } from "../loaders/InteractionsManager"
import { EventManager } from "../loaders/EventManager"
import { join } from "path"

export class DiscClient extends Client {
  public eventsManager: EventManager
  public interactionsManager: InteractionManager

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

    this.eventsManager = new EventManager()
    this.interactionsManager = new InteractionManager()
  }

  async init(): Promise<void> {
    try {
      await this.interactionsManager.loadAll(join(__dirname, '../../features'))
      await this.eventsManager.loadAll(join(__dirname, '../../events'))

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
}