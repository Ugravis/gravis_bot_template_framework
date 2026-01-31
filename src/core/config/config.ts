import { CoreConfig } from "./config.types";

export const CORE_CONFIG: CoreConfig = {
  code: {
    paths: {
      features: '/src/features',
      eventsFeatures: '/src/features/events'
    }
  },

  common: {
    infos: {
      version: 0
    }
  },

  dev: {
    defaultData: {
      prefix: '*'
    },
    discordLogChannels: {
      ready: {
        guildId: "800287894073245706",
        channelId: "805198657351712788"
      }
    }
  },

  prod: {
    defaultData: {
      prefix: '.'
    },
    discordLogChannels: {
      ready: {
        guildId: "800287894073245706",
        channelId: "805198657351712788"
      }
    }
  }
}