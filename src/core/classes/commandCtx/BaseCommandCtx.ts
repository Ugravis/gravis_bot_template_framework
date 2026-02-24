import { Guild, GuildMember, InteractionReplyOptions, TextBasedChannel, User } from "discord.js"
import { User as DbUser } from '@/features/user/database/User.entity'

export interface ContextReplyOptions {
  content?: string
  ephemeral?: boolean
  embeds?: InteractionReplyOptions['embeds']
  components?: InteractionReplyOptions['components']
}

export abstract class BaseCommandCtx {
  abstract readonly type: 'slash' | 'prefix'

  public dbUser!: DbUser

  abstract get author(): User
  abstract get guild(): Guild | null
  abstract get member(): GuildMember | null
  abstract get channel(): TextBasedChannel | null
  abstract get channelId(): string

  abstract reply(options: ContextReplyOptions | string): Promise<void>
  abstract deferReply(ephemeral?: boolean): Promise<void>
  abstract followUp(options: ContextReplyOptions | string): Promise<void>

  abstract getString(name: string, required?: boolean): string | null
  abstract getInteger(name: string, required?: boolean): number | null
  abstract getBoolean(name: string, required?: boolean): boolean | null
  abstract getNumber(name: string, required?: boolean): number | null
  abstract getUser(name: string, required?: boolean): User | null
}