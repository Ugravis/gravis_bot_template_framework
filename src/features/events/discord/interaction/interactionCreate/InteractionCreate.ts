import { BaseEvent } from "@/core/classes/BaseEvent";
import { BaseSlashCommand } from "@/core/classes/BaseSlashCommand";
import { BaseInteraction } from "discord.js";

export default class InteractionCreate extends BaseEvent<[BaseInteraction]> {
  name: string = 'interactionCreate'
  description: string = "réception d'une interaction Discord"

  async execute(interaction: BaseInteraction): Promise<void> {
    
    if (interaction.isChatInputCommand()) {
      const slashCommand: BaseSlashCommand | undefined = this.client.interactionsManager.slashCommands.get(interaction.commandName)
      if(!slashCommand) interaction.reply("Cette slash command n'existe pas.")

      await slashCommand?.execute(interaction)
      return
    }

    // Autres types d'interactions...
  }
}