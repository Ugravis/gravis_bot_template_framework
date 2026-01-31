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
  discordLogChannels: {
    ready: DiscordLogChannelConfig
  }
}

interface DiscordLogChannelConfig {
  guildId: string
  channelId: string
}