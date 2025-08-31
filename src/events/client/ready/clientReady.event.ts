import { DiscClient } from "@/core/client/DiscClient";
import { BaseEvent } from "@/core/events/BaseEvent";
import { Client } from "discord.js";

export default class ReadyEvent extends BaseEvent {
  name: string = "clientReady"
  description: string = "Démarrage du bot"

  async execute(client: DiscClient): Promise<void> {
    console.log(`BOT READY ${client.user?.tag}`)
  }
}