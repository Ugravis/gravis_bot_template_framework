import { ActivityType, GatewayIntentBits, Status } from "discord.js";
import { CoreConfig } from "./coreConfig.types";

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
      status: Status.Connecting,
      activities: [
        {
          type: ActivityType.Watching,
          name: "incredible template framework [ON DEV]",
          url: ""
        }
      ]
    },
    defaultData: {
      prefix: "*"
    }
  },
  prod: {
    presence: {
      status: Status.Connecting,
      activities: [
        {
          type: ActivityType.Watching,
          name: "incredible template framework",
          url: ""
        }
      ]
    },
    defaultData: {
      prefix: "."
    }
  },
  code: {
    paths: {
      features: ""
    }
  }
}