import { SLASH_COMMAND_INTERACTIONS } from "../classes/decorators/SlashCommandInteraction"
import { BaseSlashCommand } from "../classes/BaseSlashCommand"
import { loadFoldersFiles } from "@/shared/functions/system/readdingFiles"
import { Collection } from "discord.js"
import { MyClient } from "../client/MyClient"
import Container from "typedi"

export class InteractionsManager {
  public slashCommands = new Collection<string, BaseSlashCommand>()

  constructor(private client: MyClient) {}

  public async init(featuresPath: string): Promise<void> {
    await loadFoldersFiles(featuresPath, ['events'])

    for (const SlashCmdClass of SLASH_COMMAND_INTERACTIONS) {
      const slashCmd = Container.get<BaseSlashCommand>(SlashCmdClass)
      slashCmd.client = this.client
      this.slashCommands.set(slashCmd.name, slashCmd)
      console.log(`✅ Slash cmd loaded: ${slashCmd.name}`)
    }
  }
}