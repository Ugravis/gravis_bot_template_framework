import { ActivityType, GatewayIntentBits, Status } from "discord.js"

type GatewayIntent = keyof typeof GatewayIntentBits

export interface ClientConfigData {
  GLOBALS: {
    INFOS: {
      version: string
    },
    DEVELOPERS_LIST: {
      USERS: {
        main_id: string
        all_ids: string[]
      },
      GUILDS: {
        main_id: string
        all_ids: string[]
      }
    },
    WHITE_LIST: {
      active: boolean,
      users_ids: string[]
      guilds_ids: string[]
    },
    DISCORD: {
      intents: GatewayIntent[]
    }
  }

  DEV: ClientConfigEnvironment
  PROD: ClientConfigEnvironment

  INTERN: {
    PATHS: {
      events: string
      interactions: string
    }
  }
}

export interface ClientConfigActivity {
  type: ActivityType 
  name: string
  url?: string
}

export interface ClientConfigPresence {
  status: Status,
  activities: ClientConfigActivity[]
}

export interface ClientConfigEnvironment {
  PRESENCE: ClientConfigPresence,
  DEFAULT_DATA: {
    prefix: string
  }
}