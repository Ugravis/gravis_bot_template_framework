import { ActivityOptions, ClientPresenceStatus, GatewayIntentBits } from "discord.js"

export interface CoreConfig {
  code: CodeConfig
  common: CommonConfig
  dev: EnvConfig
  prod: EnvConfig
}

export interface CommonConfig {
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
  },
  database: {
    entities: (new (...args: any[]) => any)[],
    subscribers: (new (...args: any[]) => any)[]
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
    app: DiscordChannelConfig
    database: DiscordChannelConfig
    errors: DiscordChannelConfig
  }
}

export interface DiscordChannelConfig {
  guildId: string
  channelId: string
}

export const ENV_VAR_SCHEMA = {
  'BOT_TOKEN': String,
  'DB_NAME': String,
  'DB_HOST': String,
  'DB_USERNAME': String,
  'DB_PASSWORD': String,
  'DB_PORT': Number,
} as const

export type EnvVarSchema = {
  [K in keyof typeof ENV_VAR_SCHEMA]: 
    typeof ENV_VAR_SCHEMA[K] extends typeof Number ? number : string
}