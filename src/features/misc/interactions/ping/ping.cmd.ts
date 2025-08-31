import { DiscClient } from "@/core/client/DiscClient";
import { BaseSlashCommand } from "@/core/baseClasses/BaseSlashCommand";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default class PingCommand extends BaseSlashCommand {
  name: string = `ping`
  description: string = `obtenir la latence du bot`
  data: SlashCommandBuilder = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description)

  async execute(client: DiscClient, interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply('https://tenor.com/view/thor-thor-infinity-war-gif-25139201')
  }
}