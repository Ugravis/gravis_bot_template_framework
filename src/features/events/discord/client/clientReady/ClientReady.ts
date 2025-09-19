import { getClientGuild, getClientGuildTextChannel } from "@/shared/functions/discord/discordBasics"
import { BaseEvent } from "@/core/classes/BaseEvent"
import { Client } from "discord.js"

export default class ClientReadyEvent extends BaseEvent<[Client]> {
  name: string = 'clientReady'
  description: string = 'Démarrage du bot'

  async execute(): Promise<void> {
    const readyConfig = this.client.envConfig.discord_log_channels.ready
    
    this.client.user?.setPresence(this.client.envConfig.presence)

    if (this.client.isDevEnv()) {
      this.client.coreConfig.globals.developersList.guildIds.all.forEach(guildId => {
        const guild = getClientGuild(this.client, guildId)
        guild?.commands.set(this.client.interactionsManager.slashCommands.map(cmd => cmd.data))
      })
    } else {
      this.client.application?.commands.set(this.client.interactionsManager.slashCommands.map(cmd => cmd.data))
    }

    const channel = getClientGuildTextChannel(this.client, readyConfig.guildId, readyConfig.channelId)
    await channel?.send("Ready")
    
    return
  }
}