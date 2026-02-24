import { Guild, GuildMember, Message, TextBasedChannel, User, MessageCreateOptions } from "discord.js";
import { BaseCommandCtx, ContextReplyOptions } from "./BaseCommandCtx";

export class prefixCommandContext extends BaseCommandCtx {
  public readonly type = 'prefix' as const

  constructor(
    public readonly message: Message,
    public readonly args: string[],
    private readonly argsOrder: string[] = []
  ) { super() }

  get author(): User { return this.message.author }
  get guild(): Guild | null { return this.message.guild }
  get member(): GuildMember | null { return this.message.member }
  get channel(): TextBasedChannel | null { return this.message.channel }
  get channelId(): string { return this.message.channelId }

  async reply(options:ContextReplyOptions | string): Promise<void> {
    await this.message.reply(this.normalise(options))
  }

  async deferReply(): Promise<void> {}

  async followUp(options:ContextReplyOptions | string): Promise<void> {
    if (this.message.channel.isSendable()) this.message.channel.send(this.normalise(options))
  }

  getString(name: string): string | null {
    return this.getArg(name) ?? null
  }

  getInteger(name: string): number | null {
    const val = this.getArg(name)
    if (val === undefined) return null
    const parsed = parseInt(val, 10)
    return isNaN(parsed) ? null : parsed
  }

  getBoolean(name: string): boolean | null {
    const val = this.getArg(name)?.toLowerCase()
    if (val === undefined) return null
    if (val === 'true' || val === '1' || val === 'yes' || val === 'oui') return true
    if (val === 'false' || val === '0' || val === 'no' || val === 'non') return false
    return null
  }

  getUser(name: string): User | null {
    const val = this.getArg(name)
    if (!val) return null

    const match = val.match(/^<@!?(\d+)>$/)
    if (!match) return null

    return this.message.client.users.cache.get(match[1]) ?? null
  }

  private getArg(name: string): string | undefined {
    const index = this.argsOrder.indexOf(name)
    return index === -1
      ? undefined
      : this.args[index]
  }

  private normalise(options:ContextReplyOptions | string):MessageCreateOptions {
    if( typeof options === 'string') return { content: options }
    return options
  }
} 