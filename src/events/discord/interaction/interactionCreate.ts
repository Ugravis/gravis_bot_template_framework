import { DiscClient } from "@/core/client/DiscClient";
import { BaseEvent } from "@/core/events/BaseEvent";
import { Interaction } from "discord.js";

export default class InteractionCreate extends BaseEvent {
  name: string = "interactionCreate"
  description: string = "Interaction reçue"

  async execute(client: DiscClient, interaction: Interaction) {
    if (!interaction.isChatInputCommand() && !interaction.isButton() && !interaction.isModalSubmit()) return

    try {
      switch (true) {
        case interaction.isChatInputCommand(): {
          const cmd = client.interactions.slashCommands.get(interaction.commandName)
          if (!cmd) return
          await cmd.execute(client, interaction)
          break
        }

        case interaction.isButton(): {
          break
        }

        case interaction.isModalSubmit(): {
          break
        }
      }

    } catch (err) {
      console.error(`❌ Error in interaction ${interaction.id}`, err)
    }
  }
}