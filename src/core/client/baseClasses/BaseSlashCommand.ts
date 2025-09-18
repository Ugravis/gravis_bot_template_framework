import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { BaseInteraction, InteractionType } from "./BaseInteraction";
import { DiscClient } from "../DiscClient";

export abstract class BaseSlashCommand extends BaseInteraction<ChatInputCommandInteraction> {
  type: InteractionType = "slashCommand"
  abstract data: SlashCommandBuilder

  abstract execute(client: DiscClient, interaction: ChatInputCommandInteraction): Promise<void>;
}