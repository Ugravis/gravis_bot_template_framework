import { ChatInputCommandInteraction } from "discord.js";
import { BaseInteraction, InteractionType } from "./BaseInteraction";

export abstract class BaseSlashCommand extends BaseInteraction<ChatInputCommandInteraction> {
  type: InteractionType = "slashCommand"

  abstract execute(interaction: ChatInputCommandInteraction): Promise<void>;
}