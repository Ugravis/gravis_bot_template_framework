import { Interaction } from "discord.js"
import { DiscClient } from "../client/DiscClient"

export type InteractionType = "slashCommand" | "button" | "modalSubmit" | "classicCommand"

export abstract class BaseInteraction<T extends Interaction = Interaction> {
  abstract type: InteractionType
  abstract name: string
  abstract description: string

  abstract execute(client: DiscClient, interaction: T): Promise<void>
}