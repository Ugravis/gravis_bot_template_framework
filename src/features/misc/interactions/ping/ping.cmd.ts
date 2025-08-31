import { BaseSlashCommand } from "@/core/interactions/BaseSlashCommand";
import { ChatInputCommandInteraction } from "discord.js";

export default class PingCommand extends BaseSlashCommand {
  name: string = `ping`
  description: string = `obtenir la latence du bot`

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply('Pong')
  }
}