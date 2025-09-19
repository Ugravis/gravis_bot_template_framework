import { ActivityOptions, GatewayIntentBits, PresenceStatusData } from "discord.js"

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
      featuresEvents: string
    }
  }
}

export interface EnvConfig {
  presence: {
    status: PresenceStatusData
    activities: ActivityOptions[]
  }
  defaultData: {
    prefix: string
  }
  discord_log_channels: {
    ready: {
      guildId: string
      channelId: string
    }
    codeError: {
      guildId: string
      channelId: string
    }
  }
}