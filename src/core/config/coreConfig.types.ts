import { ActivityOptions, GatewayIntentBits, Status } from "discord.js"

export interface CoreConfig {
  globals: {
    infos: {
      version: string
    }
    developersList: {
      userIds: {
        main: string
        all: string[]
      }
      guildIds: {
        main: string
        all: string[]
      }
    },
    whiteList: {
      active: boolean
      userIds: string[]
      guildIds: string[]
    },
    discordSystem: {
      intents: GatewayIntentBits[]
    }
  }
  dev: EnvConfig
  prod: EnvConfig
  code: {
    paths: {
      features: string
    }
  }
}

export interface EnvConfig {
  presence: {
    status: Status
    activities: ActivityOptions[]
  }
  defaultData: {
    prefix: string
  }
}