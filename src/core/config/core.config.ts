import { ActivityType, GatewayIntentBits, Status } from "discord.js";
import { CoreConfig } from "./core.config.types";
import { GuildService } from "@/features/guilds/database/Guild.service";
import { Guild } from "@/features/guilds/database/Guild.entity";

const dbItems = {
  services: {
    guild: GuildService,
  },
  entities: [
    Guild
  ]
} 

export const coreConfig: CoreConfig = {
  code: {
    paths: {
      features: "src/features",
      featuresEvents: "src/features/events"
    },
    database: {
      port: 3306,
      entities: dbItems.entities,
      services: dbItems.services
    }
  },
  globals: {
    infos: {
      version: `0.0.0`
    },
    developersList: {
      userIds: {
        main: "645590628893196288",
        all: ["645590628893196288, 665271214163361803"]
      },
      guildIds: {
        main: "800287894073245706",
        all: ["800287894073245706"]
      }
    },
    whiteList: {
      active: false,
      guildIds: ["800287894073245706"],
      userIds: ["645590628893196288, 665271214163361803"]
    },
    discordSystem: {
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences
      ]
    }
  },
  dev: {
    presence: {
      status: "online",
      activities: [
        {
          type: ActivityType.Watching,
          name: "incredible template framework [ON DEV]",
          url: "https://ugravis.com"
        }
      ]
    },
    defaultData: {
      prefix: "*"
    },
    discord_log_channels: {
      ready: {
        guildId: "800287894073245706",
        channelId: "805198657351712788"
      },
      codeError: {
        guildId: "800287894073245706",
        channelId: "1418608432856170547"
      }
    }
  },
  prod: {
    presence: {
      status: "online",
      activities: [
        {
          type: ActivityType.Watching,
          name: "incredible template framework",
          url: "https://ugravis.com"
        }
      ]
    },
    defaultData: {
      prefix: "."
    },
    discord_log_channels: {
      ready: {
        guildId: "800287894073245706",
        channelId: "805198657351712788"
      },
      codeError: {
        guildId: "800287894073245706",
        channelId: "1418608432856170547"
      }
    }
  }
} as const

export type CoreConfigEntities = typeof dbItems.entities
export type CoreConfigServices = typeof dbItems.services