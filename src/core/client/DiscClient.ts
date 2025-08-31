import { Client, GatewayIntentBits } from "discord.js"
import { InteractionManager } from "./InteractionsManager"
import { EventManager } from "./EventManager"
import { join } from "path"

export class DiscClient extends Client {
  public events: EventManager
  public interactions: InteractionManager

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

    this.events = new EventManager(this)
    this.interactions = new InteractionManager()
  }

  async init(): Promise<void> {
    try {
      await this.interactions.loadAll(join(__dirname, '../../features'))
      await this.events.loadAll(join(__dirname, '../../events'))

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