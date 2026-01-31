import { BaseEvent } from "@/core/classes/BaseEvent";
import { DiscordEvent } from "@/core/classes/decorators/DiscordEventDecorator";
import { config } from "@/core/managers/ConfigManager";
import { DiscordUtils } from "@/shared/utils/discord/DiscordUtils";
import { Client, Events } from "discord.js";

@DiscordEvent()
export class ClientReady extends BaseEvent<Events.ClientReady> {
  public readonly name = Events.ClientReady
  public readonly once = true

  constructor() {
    super()
  }

  async execute(client: Client): Promise<void> {
    // const logChannel = DiscordUtils.getClientConfigGuildTextChannel(client, config.env.discordLogChannels.ready)

    console.log(`✅ Discord client ready as ${client.user!.tag} - v${config.common.infos.version}`)
  }
}