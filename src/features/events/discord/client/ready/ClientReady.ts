import { BaseEvent } from "@/core/classes/BaseEvent";
import { DiscordEvent } from "@/core/classes/decorators/DiscordEventDecorator";
import { config } from "@/core/managers/ConfigManager";
import { Client, Events } from "discord.js";

@DiscordEvent()
export class ClientReady extends BaseEvent<Events.ClientReady> {
  public readonly name = Events.ClientReady
  public readonly once = true

  constructor() {
    super()
  }

  async execute(client: Client<true>): Promise<void> {
    console.log(`✅ Discord client ready as ${client.user.tag} - v${config.common.infos.version}`)
  }
}