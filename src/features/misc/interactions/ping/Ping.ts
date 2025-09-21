import { BaseSlashCommand } from "@/core/classes/BaseSlashCommand";
import { SlashCommandInteraction } from "@/core/classes/decorators/SlashCommandInteraction";
import { CacheType, ChatInputCommandInteraction } from "discord.js";

@SlashCommandInteraction()
export default class Ping extends BaseSlashCommand {
  name: string = `ping`
  description: string = `renvoie la latence du bot`

  async execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
    interaction.reply('Pong')
    throw new Error("Test")
  }
}