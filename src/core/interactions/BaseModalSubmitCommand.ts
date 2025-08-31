import { ModalSubmitInteraction } from "discord.js";
import { BaseInteraction, InteractionType } from "./BaseInteraction";

export abstract class BaseModalSubmitCommand extends BaseInteraction<ModalSubmitInteraction> {
  type: InteractionType = "modalSubmit"

  abstract execute(interaction: ModalSubmitInteraction): Promise<void>;
}