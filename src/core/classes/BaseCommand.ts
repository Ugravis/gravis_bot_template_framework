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
    const requiredArgs = this.getRequiredArgs()

    for (const arg of requiredArgs) {
      const value = (ctx as any).getArg?.(arg.name)
      if (!value) {
        errors.push(`\`${arg.name}\` (${this.getTypeLabel(arg.type)}) - manquant`)
        continue
      }

      if (!this.isValidType(value, arg.type)) {
        errors.push(`\`${arg.name}\` (${this.getTypeLabel(arg.type)}) — format invalide`)
      }
    }
    return {
      valid: errors.length === 0,
      errors
    }
  }

  private isValidType(value: string, type: number): boolean {
    switch (type) {
      // Sring
      case 3:
        return value.length > 0

      // Integer
      case 4: 
        const intVal = parseInt(value, 10)
        return !isNaN(intVal) && Number.isInteger(intVal)

      // Boolean
      case 5:
        return [
          'true', '1', 'yes', 'oui', 
          'false', '0', 'no', 'non'
        ].includes(value.toLocaleLowerCase())

      // User
      case 6:
        return /^<@!?(\d+)>$/.test(value)

      // Number
      case 10: 
        return !isNaN(parseFloat(value))

      default:
        return true
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