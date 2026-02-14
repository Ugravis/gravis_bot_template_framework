import { BaseEvent } from "@/core/classes/BaseEvent";
import { Client, Events } from "discord.js";

export default class ClientReady extends BaseEvent<Events.ClientReady> {
  public readonly name = Events.ClientReady
  public readonly once = true

  public async execute(client: Client<true>): Promise<void> {
    this.ctx.logger.info(`${client.user.tag}: ClientReady event`)
  }
}