import { ButtonInteraction } from "discord.js";
import { BaseInteraction, InteractionType } from "./BaseInteraction";
import { DiscClient } from "../DiscClient";

export abstract class BaseButtonCommand extends BaseInteraction<ButtonInteraction> {
  type: InteractionType = "button"

  abstract execute(client: DiscClient, interaction: ButtonInteraction): Promise<void>;
}