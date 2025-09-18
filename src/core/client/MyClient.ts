import { Client } from 'discord.js'
import { CoreConfig } from '../config/coreConfig.types'
import { coreConfig } from '../config/coreConfig'
import { InteractionsManager } from '../managers/InteractionsManager'
import { EventsManager } from '../managers/EventsManager'

export class MyClient extends Client {
  private coreConfig: CoreConfig
  public eventsManager: EventsManager
  private interactionsManager: InteractionsManager

  constructor() {
    super({
      intents: [coreConfig.globals.discordSystem.intents]
    })
    this.coreConfig = coreConfig
    this.eventsManager = new EventsManager()
    this.interactionsManager = new InteractionsManager()
  }
  
  public async init(): Promise<void> {
    try {
      await this.interactionsManager.loadAll(this.coreConfig.code.paths.features)
      await this.eventsManager.loadAll(this.coreConfig.code.paths.featuresEvents)

      await this.login(
        process.env.NODE_ENV === 'development'
          ? process.env.DEV_BOT_TOKEN
          : process.env.PROD_BOT_TOKEN
      )
      console.log(`✅ Bot connected`)

    } catch (err) {
      console.error(`❌ Error on DiscBot login: `, err)
    }
  }
}