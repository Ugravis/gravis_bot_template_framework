import { singleton } from "tsyringe"
import { DiscordClient } from "@/core/DiscordClient"
import { DiscordChannelConfig } from "@/core/config/config.types"
import { Guild, GuildBasedChannel, MessageCreateOptions, SendableChannels, TextBasedChannel } from "discord.js"
import { Logger } from "@/core/managers/LoggerManager"

@singleton()
export class DiscordUtils {
  constructor(
    private readonly discordClient: DiscordClient,
    private readonly logger: Logger
  ) {}


  public getClientGuild(guildId: string): Guild | undefined {
    const guild = this.discordClient.clientInstance.guilds.cache.get(guildId)
    if (!guild) this.logger.warn(`Guild not found: ${guildId}`)
    return guild
  }


  public getClientConfigGuildTextChannel(
    chanAddress: DiscordChannelConfig
  ): SendableChannels | undefined {

    const guild = this.getClientGuild(chanAddress.guildId)
    if (!guild) return undefined


    const channel: GuildBasedChannel | undefined = guild.channels.cache.get(chanAddress.channelId);
    if (!channel) {
      this.logger.warn(`Channel not found: ${chanAddress.guildId}/${chanAddress.channelId}`)
      return undefined
    }

    if (!channel.isTextBased()) {
      this.logger.warn(`Channel is not text-based: ${chanAddress.guildId}/${chanAddress.channelId}`)
      return undefined
    }

    return channel
  }


  public async sendClientConfigMessage(
    chanAddress: DiscordChannelConfig,
    message: MessageCreateOptions
  ): Promise<void> {

    const channel = this.getClientConfigGuildTextChannel(chanAddress)
    if(!channel) return

    if(!channel.isSendable()) {
      this.logger.warn(`Channel not sendable: ${chanAddress.guildId}/${chanAddress.channelId}`)
      return
    }
    
    try {
      await channel.send(message)
    } catch (e) {
      this.logger.warn(`Failed to send message in channel: ${chanAddress.guildId}/${chanAddress.channelId}, ${e}`)
    }
  }
}