import { BaseSlashCommand } from "@/core/classes/BaseSlashCommand";
import { SlashCommandInteraction } from "@/core/classes/decorators/SlashCommandInteraction";
import { GuildService } from "@/features/guilds/database/Guild.service";
import { CacheType, ChatInputCommandInteraction } from "discord.js";

@SlashCommandInteraction()
export default class Ping extends BaseSlashCommand {
  name: string = `ping`
  description: string = `renvoie la latence du bot`

  async execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
    interaction.reply('Pong')
    // this.client.db.services.get(GuildService).findById(2)
    // this.client.db.servicesManager.services.
    throw new Error("Test")
  }
}