import { Service } from "typedi"
import { BaseSlashCommand } from "../BaseSlashCommand"

export const SLASH_COMMAND_INTERACTIONS: (new (...args: any[]) => BaseSlashCommand)[] = []

export function SlashCommandInteraction(): ClassDecorator {
  return target => {
    SLASH_COMMAND_INTERACTIONS.push(target as any)
    Service()(target as any)
  }
}