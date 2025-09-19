import { Guild, GuildBasedChannel, SendableChannels } from "discord.js"
import { MyClient } from "@/core/client/MyClient"


export function getClientGuildTextChannel(
  client: MyClient,
  guildId: string, 
  channelId: string
): SendableChannels | undefined {
  
  const guild: Guild | undefined = getClientGuild(client, guildId)
  if (!guild) return undefined
  const channel: GuildBasedChannel | undefined = guild.channels.cache.get(channelId)
  return channel?.isTextBased() ? channel : undefined
}


export function getClientGuild(
  client: MyClient,
  guildId: string
): Guild | undefined {

  const guild: Guild | undefined = client.guilds.cache.get(guildId)
  return guild
}