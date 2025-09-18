import { Client } from 'discord.js'
import { CoreConfig, EnvConfig } from '../config/coreConfig.types'
import { coreConfig } from '../config/coreConfig'
import { InteractionsManager } from '../managers/InteractionsManager'
import { EventsManager } from '../managers/EventsManager'
import { join } from "path"

export class MyClient extends Client {
  public coreConfig: CoreConfig
  public envConfig: EnvConfig
  public eventsManager: EventsManager
  private interactionsManager: InteractionsManager
  private nodeEnv: string | undefined = process.env.NODE_ENV

  constructor() {
    super({
      intents: coreConfig.globals.discordSystem.intents
    })
    this.coreConfig = coreConfig
    this.envConfig = this.nodeEnv === 'development' ? this.coreConfig.dev : this.coreConfig.prod
    this.eventsManager = new EventsManager(this)
    this.interactionsManager = new InteractionsManager(this)
  }
  
  public async init(): Promise<void> {
    try {
      await this.interactionsManager.loadAll(join(process.cwd(), this.coreConfig.code.paths.features))
      await this.eventsManager.loadAll(join(process.cwd(), this.coreConfig.code.paths.featuresEvents))

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