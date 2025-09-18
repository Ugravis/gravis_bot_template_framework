import { InteractionType, Interaction } from "discord.js";
import { MyClient } from "../client/MyClient";

export abstract class BaseInteraction<T extends Interaction = Interaction> {
  public client!: MyClient
  abstract type: InteractionType
  abstract name: string
  abstract description: string

  abstract execute(interaction: T): Promise<void>
}