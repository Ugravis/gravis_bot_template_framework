import { BaseEvent } from "@/core/classes/BaseEvent";
import { PrefixCommandContext } from "@/core/classes/commandCtx/PrefixCommandCtx";
import { CommandsManager } from "@/core/managers/CommandsManager";
import { ConfigManager } from "@/core/managers/ConfigManager";
import { Logger } from "@/core/managers/LoggerManager";
import { User as DbUser } from "@/features/user/database/User.entity";
import { UserService } from "@/features/user/database/User.service";
import { Events, Message, MessageType, OmitPartialGroupDMChannel } from "discord.js";
import { injectable } from "tsyringe";

@injectable()
export default class MessageCreate extends BaseEvent<Events.MessageCreate> {
  public readonly name = Events.MessageCreate
  public readonly once = false

  constructor(
    private readonly config: ConfigManager,
    private readonly commandsManager: CommandsManager,
    private readonly logger: Logger,
    private readonly userService: UserService
  ) { super() }

  public async execute(message: OmitPartialGroupDMChannel<Message<boolean>>): Promise<void> {
    const dbUser: DbUser = await this.userService.upsert(message.author)

    if (message.author.bot || (message.type !== MessageType.Default)) return 

    const prefix = this.config.env.defaultData.prefix
    if (!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/)
    if (!args.length || !args[0]) return

    const cmdName = args.shift()!.toLowerCase()
    const cmd = this.commandsManager.getCommand(cmdName)
    
    if (!cmd) return
    if (!cmd.scope.includes('prefix')) return

    try {
      const cmdCtx = new PrefixCommandContext(message, args, cmd)
      cmdCtx.dbUser = dbUser

      const argsValidation = cmd.validateRequiredArgs(cmdCtx)
      if (!argsValidation.valid) {
        await cmdCtx.reply({
          content:
            `Arguments invalides.\n`+
            `Usage : ${cmd.getUsage()}`
        })
        return
      }

      await cmd.execute(cmdCtx)

    } catch (e) {
      this.logger.error(`Error executing prefix command ${cmdName}: ${e}`)

      try {
        await message.reply({
          content: `Une erreur est survenue lors de l'exécution de la commande.`
        })
      } catch (replyError) {
        this.logger.error(`Failed to send error reply: ${replyError}`)
      }
    }
  }
}