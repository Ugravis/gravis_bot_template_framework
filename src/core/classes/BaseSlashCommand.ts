import { ChatInputCommandInteraction, InteractionType, RESTPostAPIApplicationCommandsJSONBody, SlashCommandBuilder } from "discord.js";
import { BaseInteraction } from "./BaseInteraction";

export abstract class BaseSlashCommand extends BaseInteraction<ChatInputCommandInteraction> {
  type: InteractionType = InteractionType.ApplicationCommand
  public options: any[] = []
  
  public getDiscordCommandBuilder(): RESTPostAPIApplicationCommandsJSONBody {
    return {
      name: this.name,
      description: this.description,
      options: this.options
    }
  }
}