import { BaseEvent } from "@/core/classes/BaseEvent"
import { ConfigManager } from "@/core/managers/ConfigManager"
import { Logger } from "@/core/managers/LoggerManager"
import { DiscordUtils } from "@/shared/utils/discord/DiscordUtils"
import { Client, Events, SendableChannels } from "discord.js"
import { injectable } from "tsyringe"

@injectable()
export default class ClientReady extends BaseEvent<Events.ClientReady> {
  public readonly name = Events.ClientReady
  public readonly once = true

  constructor(
    private readonly logger: Logger,
    private readonly discordUtils: DiscordUtils,
    private readonly config: ConfigManager
  ) {
    super()
  }

  public async execute(client: Client<true>): Promise<void> {
    this.logger.info(`${client.user.tag} (id: ${client.user.id}): ${this.name} event`)

    this.discordUtils.sendClientConfigMessage(
      this.config.env.discordLogChannels.ready, { 
        content: "I'm ready" 
      }
    )
  }
}