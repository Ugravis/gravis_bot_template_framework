import { CoreConfig } from "@/core/config/config.types"
import { User } from "@/features/user/database/User.entity"
import { ActivityType, GatewayIntentBits } from "discord.js"

export const CORE_CONFIG: CoreConfig = {
  code: {
    paths: {
      features: '/src/features',
      eventsFeatures: '/src/features/events'
    },
    database: {
      entities: [
        User
      ]
    }
  },

  common: {
    infos: {
      version: 0
    },
    discordSystem: {
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences
      ]
    },
    developersList: {
      userIds: {
        main: '645590628893196288',
        others: ['665271214163361803'],
        get all() { return [this.main, ...this.others] }
      },
      guildIds: {
        main: '800287894073245706',
        others: [],
        get all() { return [this.main, ...this.others] }
      }
    }
  },

  dev: {
    defaultData: {
      prefix: '*'
    },
    presence: {
      status: "online",
      activities: [
        {
          type: ActivityType.Watching,
          name: "Incredible template framework [DEV]",
          url: "https://ugravis.com"
        }
      ]
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
    presence: {
      status: "online",
      activities: [
        {
          type: ActivityType.Watching,
          name: "Incredible template framework [ON DEV]",
          url: "https://ugravis.com"
        }
      ]
    },
    discordLogChannels: {
      ready: {
        guildId: "800287894073245706",
        channelId: "805198657351712788"
      }
    }
  }
}