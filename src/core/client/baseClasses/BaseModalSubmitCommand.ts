import { ModalSubmitInteraction } from "discord.js";
import { BaseInteraction, InteractionType } from "./BaseInteraction";
import { DiscClient } from "../DiscClient";

export abstract class BaseModalSubmitCommand extends BaseInteraction<ModalSubmitInteraction> {
  type: InteractionType = "modalSubmit"

  abstract execute(client: DiscClient, interaction: ModalSubmitInteraction): Promise<void>;
}