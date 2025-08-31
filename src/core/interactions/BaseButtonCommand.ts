import { ButtonInteraction } from "discord.js";
import { BaseInteraction, InteractionType } from "./BaseInteraction";

export abstract class BaseButtonCommand extends BaseInteraction<ButtonInteraction> {
  type: InteractionType = "button"

  abstract execute(interaction: ButtonInteraction): Promise<void>;
}