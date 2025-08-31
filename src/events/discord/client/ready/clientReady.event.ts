import { DiscClient } from "@/core/client/DiscClient";
import { BaseEvent } from "@/core/baseClasses/BaseEvent";

export default class ReadyEvent extends BaseEvent {
  name: string = "clientReady"
  description: string = "Démarrage du bot"

  async execute(client: DiscClient): Promise<void> {

    const guildFound = client.guilds.cache.get('800287894073245706')
    if (!guildFound) return console.error("Dev guild not found")
    guildFound.commands.set(client.interactionsManager.slashCommands.map(cmd => { return cmd.data }))

    console.log(`BOT READY ${client.user?.tag}`)
  }
}