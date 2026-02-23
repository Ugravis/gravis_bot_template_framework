import { BaseEvent } from "@/core/classes/BaseEvent";
import { Logger } from "@/core/managers/LoggerManager";
import { Client, Events } from "discord.js";
import { injectable } from "tsyringe";

@injectable()
export default class ClientReady extends BaseEvent<Events.ClientReady> {
  public readonly name = Events.ClientReady
  public readonly once = true

  constructor(
    private readonly logger: Logger
  ) {
    super()
  }

  public async execute(client: Client<true>): Promise<void> {
    this.logger.info(`${client.user.tag}: ClientReady event`)
  }
}