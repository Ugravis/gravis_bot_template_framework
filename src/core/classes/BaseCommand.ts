import { SlashCommandBuilder } from "discord.js"
import { BaseCommandCtx } from "./commandCtx/BaseCommandCtx"

export type CommandScope = 'slash' | 'prefix'

export abstract class BaseCommand {
  abstract readonly name: string
  abstract readonly description: string
  abstract readonly scope: readonly CommandScope[]

  public readonly alias: string[] = []

  protected commandBuild(builder: SlashCommandBuilder): SlashCommandBuilder {
    return builder
  }

  public slashBuilder(): SlashCommandBuilder {
    const base = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)

    return this.commandBuild(base)
  }

  public getArgs() {
    return this.slashBuilder().options
      .map((opt: any) => ({
        name: opt.name,
        type: opt.type,
        required: opt.required ?? false
      }))
  }

  public getRequiredArgs() {
    return this.getArgs().filter(opt => opt.required)
  }

  public getUsage(separator: string = ' **|** ') {
    const args = this.getArgs()
    return args.map(arg => `\`${arg.name} <${this.getTypeLabel(arg.type)}>${!arg.required ? ` (optionnel)` : ``}\``).join(separator)
  }

  public validateRequiredArgs(ctx: BaseCommandCtx): { valid: boolean, errors: string[] } {
    const errors: string[] = []
    const allArgs = this.getArgs()

    for (const arg of allArgs) {
      if ((ctx as any).hasArg(arg.name)) {
        const value = this.getArgValue(ctx, arg.type, arg.name)
        
        if (value === null && arg.required) {
          errors.push(`\`${arg.name}\` (${this.getTypeLabel(arg.type)}) - manquant`)

        } else if (value === null && !arg.required) {
          errors.push(`\`${arg.name}\` (${this.getTypeLabel(arg.type)}) — format invalide`)
        }
      } else if (arg.required) {
        errors.push(`\`${arg.name}\` (${this.getTypeLabel(arg.type)}) - manquant`)
      }
    }
    return {
      valid: errors.length === 0,
      errors
    }
  }

  private getArgValue(ctx: BaseCommandCtx, type: number, name: string): any {
    switch (type) {
      case 3: // String
        return ctx.getString(name)
      case 4: // Integer
        return ctx.getInteger(name)
      case 5: // Boolean
        return ctx.getBoolean(name)
      case 6: // User
        return ctx.getUser(name)
      case 10: // Number
        return ctx.getNumber(name)
      default:
        return null
    }
  }

  private getTypeLabel(type: number): string {
    const types: Record<number, string> = {
      3: 'texte', 
      4: 'entier', 
      5: 'booléen', 
      6: 'utilisateur',
      10: 'nombre'
    }
    return types[type] ?? 'inconnu'
  }

  abstract execute(cmd: BaseCommandCtx): Promise<void> | void
}