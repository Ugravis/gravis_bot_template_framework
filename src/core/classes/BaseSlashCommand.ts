import { ChatInputCommandInteraction, InteractionType, SlashCommandBuilder } from "discord.js";
import { BaseInteraction } from "./BaseInteraction";

export abstract class BaseSlashCommand extends BaseInteraction<ChatInputCommandInteraction> {
  type: InteractionType = InteractionType.ApplicationCommand
  abstract data: SlashCommandBuilder
}