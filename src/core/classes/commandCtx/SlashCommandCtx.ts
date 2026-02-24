import { BaseCommandCtx, ContextReplyOptions } from "@/core/classes/commandCtx/BaseCommandCtx"
import { ChatInputCommandInteraction, Guild, GuildMember, InteractionReplyOptions, InteractionEditReplyOptions, TextBasedChannel, User } from "discord.js"

export class SlashCommandCtx extends BaseCommandCtx {
  public readonly type = 'slash' as const

  constructor(
    public readonly interaction: ChatInputCommandInteraction
  ) { super() }

  get author(): User { return this.interaction.user }
  get guild(): Guild | null { return this.interaction.guild }
  get member(): GuildMember | null { return this.interaction.member as GuildMember | null }
  get channel(): TextBasedChannel | null { return this.interaction.channel }
  get channelId(): string { return this.interaction.channelId }

  async reply(options: ContextReplyOptions | string): Promise<void> {
    if (this.interaction.deferred || this.interaction.replied) {
      const resolved = this.normaliseEdit(options)
      await this.interaction.editReply(resolved)
    } else {
      const resolved = this.normalise(options)
      await this.interaction.reply(resolved)
    }
  }

  async deferReply(ephemeral = false): Promise<void> {
    await this.interaction.deferReply({ ephemeral })
  }

  async followUp(options: ContextReplyOptions | string): Promise<void> {
    await this.interaction.followUp(this.normalise(options))
  }

  getString(name: string, required = false): string | null {
    return this.interaction.options.getString(name, required)
  }

  getInteger(name: string, required = false): number | null {
    return this.interaction.options.getInteger(name, required)
  }

  getBoolean(name: string, required = false): boolean | null {
    return this.interaction.options.getBoolean(name, required)
  }

  getUser(name: string, required = false): User | null {
    return this.interaction.options.getUser(name, required)
  }

  private normalise(options: ContextReplyOptions | string): InteractionReplyOptions {
    return typeof options === 'string' ? { content: options } : options
  }

  private normaliseEdit(
    options: ContextReplyOptions | string
  ): InteractionEditReplyOptions {
    if (typeof options === 'string') return { content: options }

    const { ephemeral, ...rest } = options
    return rest
  }
}