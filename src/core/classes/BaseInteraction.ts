import { InteractionType, Interaction } from "discord.js";
import { MyClient } from "../client/MyClient";

export abstract class BaseInteraction<T extends Interaction = Interaction> {
  abstract type: InteractionType
  abstract name: string
  abstract description: string

  abstract execute(client: MyClient, interaction: T): Promise<void>
}