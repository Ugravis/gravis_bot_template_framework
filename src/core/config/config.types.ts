import { ActivityOptions, ClientPresenceStatus, GatewayIntentBits } from "discord.js"

export interface CoreConfig {
  code: CodeConfig
  common: CommonConfig
  dev: EnvConfig
  prod: EnvConfig
}

export interface CommonConfig {
  infos: {
    version: number
  }
  discordSystem: {
    intents: GatewayIntentBits[]
  }
  developersList: {
    userIds: {
      main: string
      others: string[]
      all: string[]
    }
    guildIds: {
      main: string
      others: string[]
      all: string[]
    }
  }
}

export interface CodeConfig {
  paths: {
    features: string
    eventsFeatures: string
  }
}

export interface EnvConfig {
  defaultData: {
    prefix: string
  }
  presence: {
    status: ClientPresenceStatus
    activities: ActivityOptions[]
  }
  discordLogChannels: {
    ready: DiscordChannelConfig
  }
}

export interface DiscordChannelConfig {
  guildId: string
  channelId: string
}