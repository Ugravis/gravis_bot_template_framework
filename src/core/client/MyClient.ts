import { Client } from 'discord.js'
import { CoreConfig } from '../config/coreConfig.types'
import { coreConfig } from '../config/coreConfig'
import { InteractionsHandler } from '../handlers/interactionsHandler'

export class MyClient extends Client {
  private coreConfig: CoreConfig
  private interactionsHandler: InteractionsHandler

  constructor() {
    super({
      intents: [coreConfig.globals.discordSystem.intents]
    })
    this.coreConfig = coreConfig
    this.interactionsHandler = new InteractionsHandler()
  }
  
  public async init(): Promise<void> {
    try {
      await this.interactionsHandler.loadAll(this.coreConfig.code.paths.features)

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