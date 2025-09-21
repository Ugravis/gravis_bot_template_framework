import { ActivityType, GatewayIntentBits, Status } from "discord.js";
import { CoreConfig } from "./core.config.types";

export const coreConfig: CoreConfig = {
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
  },
  code: {
    paths: {
      features: "src/features",
      featuresEvents: "src/features/events"
    },
    database: {
      port: 3306
    }
  }
}