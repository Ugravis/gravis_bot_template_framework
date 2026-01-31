import { Client } from "@/core/Client";
import { DiscordChannelConfig } from "@/core/config/config.types";
import { Guild, GuildBasedChannel, SendableChannels } from "discord.js";

export class DiscordUtils {
  private constructor() {}

  public static getClientConfigGuildTextChannel(
    client: Client,
    chanAddress: DiscordChannelConfig
  ): SendableChannels | undefined {
    
    const guild: Guild | undefined = this.getClientGuild(client, chanAddress.guildId)
    if (!guild) return undefined
    const channel: GuildBasedChannel | undefined = guild.channels.cache.get(chanAddress.channelId)
    return channel?.isTextBased() ? channel : undefined
  }

  public static getClientGuild(
    client: Client,
    guildId: string
  ): Guild | undefined {
    
    const guild: Guild | undefined = client.getNativeClient().guilds.cache.get(guildId)
    return guild
  }
}