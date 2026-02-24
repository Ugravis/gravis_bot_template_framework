import { SlashCommandBuilder } from "discord.js"
import { BaseCommandCtx } from "./commandCtx/BaseCommandCtx"

export type CommandScope = 'slash' | 'prefix'

export abstract class BaseCommand {
  abstract readonly name: string
  abstract readonly description: string
  abstract readonly scope: readonly CommandScope[]

  public readonly argOrder: string[] = []
  public readonly alias: string[] = []

  public slashBuilder(): SlashCommandBuilder {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
  }

  abstract execute(cmd: BaseCommandCtx): Promise<void> | void
}