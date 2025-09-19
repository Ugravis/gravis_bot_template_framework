import { BaseSlashCommand } from "@/core/classes/BaseSlashCommand";
import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default class Ping extends BaseSlashCommand {
  name: string = `ping`
  description: string = `renvoie la latence du bot`

  async execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
    interaction.reply('Pong')
    throw new Error("Test")
  }
}