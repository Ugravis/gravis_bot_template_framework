import { Interaction } from "discord.js";
import { BaseInteraction, InteractionType } from "./BaseInteraction";

export abstract class BaseClassicCommand extends BaseInteraction<Interaction> {
  type: InteractionType = "button"

  abstract execute(interaction: Interaction): Promise<void>;
}