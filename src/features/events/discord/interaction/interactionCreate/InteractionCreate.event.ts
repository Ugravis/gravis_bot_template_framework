import { BaseEvent } from "@/core/classes/BaseEvent"
import { SlashCommandCtx } from "@/core/classes/commandCtx/SlashCommandCtx"
import { CommandsManager } from "@/core/managers/CommandsManager"
import { ConfigManager } from "@/core/managers/ConfigManager"
import { Logger } from "@/core/managers/LoggerManager"
import { UserService } from "@/features/user/database/User.service"
import { CacheType, Events, Interaction, InteractionReplyOptions } from "discord.js"
import { injectable } from "tsyringe"

@injectable()
export default class InteractionCreate extends BaseEvent<Events.InteractionCreate> {
  public readonly name = Events.InteractionCreate
  public readonly once = false

  constructor(
    private readonly commandsManager: CommandsManager,
    private readonly logger: Logger,
    private readonly userService: UserService
  ) { super() }

  public async execute(interaction: Interaction<CacheType>): Promise<void> {
    if (interaction.isChatInputCommand()) {
      const cmdName = interaction.commandName.toLowerCase()
      const cmd = this.commandsManager.getCommand(cmdName)

      if (!cmd || !cmd.scope.includes('slash')) return

      try {
        const cmdCtx = new SlashCommandCtx(interaction)

        cmdCtx.dbUser = await this.userService.upsert(interaction.user)

        const argsValidation = cmd.validateRequiredArgs(cmdCtx)
        if (!argsValidation.valid) {
          await cmdCtx.reply({
            content: 
              `Arguments invalides.\n`+
              `Usage: ${cmd.getUsage()}`
          })
          return
        }

        await cmd.execute(cmdCtx)
        
      } catch (e) {
        this.logger.error(`Error executing slash command ${cmdName}: ${e}`)

        try {
          const errorMsg: InteractionReplyOptions = {
            content: `Une erreur est survenue lors de l'exécution de la commande.`,
            flags: ['Ephemeral']
          }

          if (!interaction.replied && !interaction.deferred) {
            await interaction.reply(errorMsg)

          } else {
            await interaction.followUp(errorMsg)
          }
        } catch (replyError) {
          this.logger.error(`Failed to send error reply: ${replyError}`)
        }
      }
    }
  }
}