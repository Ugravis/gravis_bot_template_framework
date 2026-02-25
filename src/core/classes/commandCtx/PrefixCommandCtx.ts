import { Guild, GuildMember, Message, TextBasedChannel, User, MessageCreateOptions, MessageFlags } from "discord.js";
import { BaseCommandCtx, ContextReplyOptions } from "./BaseCommandCtx";
import { BaseCommand } from "../BaseCommand";

export class PrefixCommandContext extends BaseCommandCtx {
  public readonly type = 'prefix' as const

  constructor(
    public readonly message: Message,
    public readonly args: string[],
    private readonly command: BaseCommand
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
    const num = Number(val)
    if (!Number.isInteger(num)) return null
    return num
  }

  getNumber(name: string): number | null {
    const val = this.getArg(name)
    if (val === undefined) return null
    const num = Number(val)
    if (Number.isNaN(num)) return null
    return num
  }

  getBoolean(name: string): boolean | null {
    const val = this.getArg(name)?.toLowerCase()
    if (val === undefined) return null
    if (['true', '1', 'yes', 'oui'].includes(val)) return true
    if (['false', '0', 'no', 'non'].includes(val)) return false
    return null
  }

  getUser(name: string): User | null {
    const val = this.getArg(name)
    if (!val) return null

    const match = val.match(/^<@!?(\d+)>$/)
    if (!match) return null

    return this.message.client.users.cache.get(match[1]) ?? null
  }

  hasArg(name: string): boolean {
    return this.getArg(name) !== undefined
  }

  private getArg(name: string): string | undefined {
    const options = this.command.slashBuilder().options
    const index = options.findIndex((opt: any) => opt.name === name)
    return index === -1 ? undefined : this.args[index]
  }

  private normalise(options: ContextReplyOptions | string):MessageCreateOptions {
    if (typeof options === 'string') return { content: options }

    const result: MessageCreateOptions = { ...options }
    if (result.components?.length) {
      result.flags = MessageFlags.IsComponentsV2
    }
    return result
  }
} 