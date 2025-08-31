import { Interaction } from "discord.js"

export type InteractionType = "slashCommand" | "button" | "modalSubmit" | "classicCommand"

export abstract class BaseInteraction<T extends Interaction = Interaction> {
  abstract type: InteractionType
  abstract name: string
  abstract description: string

  abstract execute(interaction: T): Promise<void>
}