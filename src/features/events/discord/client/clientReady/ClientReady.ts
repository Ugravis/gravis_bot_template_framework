import { getClientGuild, getClientGuildTextChannel } from "@/shared/functions/discord/discordBasics"
import { EventInteraction } from "@/core/classes/decorators/EventInteraction"
import { BaseEvent } from "@/core/classes/BaseEvent"
import { Client } from "discord.js"

@EventInteraction()
export default class ClientReadyEvent extends BaseEvent<[Client]> {
  name: string = 'clientReady'
  description: string = 'Démarrage du bot'

  async execute(): Promise<void> {
    const readyLogConfig = this.client.envConfig.discord_log_channels.ready

    this.client.logger.init()
    
    this.client.user?.setPresence(this.client.envConfig.presence)

    if (this.client.isDevEnv()) {
      this.client.coreConfig.globals.developersList.guildIds.all.forEach(guildId => {
        const guild = getClientGuild(this.client, guildId)
        guild?.commands.set(this.client.interactionsManager.slashCommands.map(cmd => cmd.getDiscordCommandBuilder()))
      })
    } else {
      this.client.application?.commands.set(this.client.interactionsManager.slashCommands.map(cmd => cmd.getDiscordCommandBuilder()))
    }

    const channel = getClientGuildTextChannel(this.client, readyLogConfig.guildId, readyLogConfig.channelId)
    await channel?.send("Ready")
    
    return
  }
}