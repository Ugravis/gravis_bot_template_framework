import { BaseEvent } from "@/core/classes/BaseEvent";

export default class ClientReadyEvent extends BaseEvent {
  name: string = 'clientReady'
  description: string = 'Démarrage du bot'

  async execute(): Promise<void> {
    const readyConfig = this.client.envConfig.discord_log_channels.ready
    
    this.client.user?.setPresence(this.client.envConfig.presence)

    const devGuild = this.client.guilds.cache.get(readyConfig.guildId)
    if (!devGuild) return console.error("Dev guild not found") /* Faire fonction utilitaire - et pour channel */
    const channel = devGuild.channels.cache.get(readyConfig.channelId)
    if (channel?.isTextBased()) {
      await channel.send("Ready")
    }
    return
  }
}