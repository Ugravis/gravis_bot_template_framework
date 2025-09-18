import { Client } from 'discord.js'
import { CoreConfig } from '../config/coreConfig.types'
import { coreConfig } from '../config/coreConfig'

export class MyClient extends Client {
  private coreConfig: CoreConfig

  constructor() {
    super({
      intents: [coreConfig.globals.discordSystem.intents]
    })
    this.coreConfig = coreConfig
  }
  
  public async init(): Promise<void> {
    try {
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