import { container, singleton } from "tsyringe";
import { BaseCommand } from "../classes/BaseCommand";
import { Logger } from "./LoggerManager";
import { ConfigManager } from "./ConfigManager";
import { DiscordClient } from "../DiscordClient";
import { loadFoldersFiles } from "@/shared/utils/system/fileLoader";
import { Collection } from "discord.js";
import { DiscordUtils } from "@/shared/utils/discord/DiscordUtils";

@singleton()
export class CommandsManager {
  private readonly commands = new Collection<string, BaseCommand>()
  private readonly alias = new Collection<string, string>()

  constructor(
    private readonly logger: Logger,
    private readonly config: ConfigManager,
    private readonly client: DiscordClient,
    private readonly discordUtils: DiscordUtils
  ) {}

  public async init(): Promise<void> {
    await this.loadCommands()
    this.logger.info(`Total of ${this.commands.size} commands loaded`)
  }

  public async registerSlashCommands(): Promise<void> {
    const slashData = this.commands
      .filter(cmd => cmd.scope.includes('slash'))
      .map(cmd => cmd.slashBuilder().toJSON())

    if (!slashData.length) return

    try {
      if (!this.config.isProduction) {
        const devGuildIds = this.config.common.developersList.guildIds.all
        
        if (!devGuildIds.length) {
          this.logger.warn(`config.common.developersList.guildIds is not configured`)
        
        } else {
          devGuildIds.forEach(guildId => {
            const guild = this.discordUtils.getClientGuild(guildId)
            if (!guild) {
              this.logger.warn(`Developer guild not found: ${guildId}`)
            } else {
              guild.commands.set(slashData)
              this.logger.info(`Total of ${slashData.length} slash commands registered to dev guild ${guild?.name} (id: ${guild?.id})`)
            }
          })
        }
      } else {
        if (!this.client.clientInstance.application) this.logger.error(`Client application is null`)
        await this.client.clientInstance.application?.commands.set(slashData)
        this.logger.info(`${slashData.length} slash commands registered globally`)
      }
    } catch (e) {
      this.logger.error(`Failed to register slash commands: ${e}`)
    }
  }

  public get loadedCommands(): Collection<string, BaseCommand> {
    return this.commands
  }

  private async loadCommands(): Promise<void> {
    const cmdClasses = await loadFoldersFiles<BaseCommand>(this.config.code.paths.features)

    for (const cmdClass of cmdClasses) {
      const instance = container.resolve(cmdClass)
      if (!(instance instanceof BaseCommand)) continue

      this.commands.set(instance.name, instance)
      this.checkAlias(instance)
      this.logger.info(`[${instance.scope.join('/')}] command loaded: ${instance.name}`)
    }
  }

  private checkAlias(cmd: BaseCommand): void {
    this.commands.set(cmd.name, cmd)

    if (cmd.alias.length) {
      for (const alias of cmd.alias) {
        if (this.alias.get(alias)) {
          this.logger.warn(`Alias conflict: '${alias}' (from '${cmd.name}') already registered (skipping)`)
          continue
        }
        this.alias.set(alias, cmd.name)
      }
    }
  }

  public getCommand(nameOrAlias: string): BaseCommand | undefined {
    const command = this.commands.get(nameOrAlias)
    if (command) return command

    const originalName = this.alias.get(nameOrAlias)
    if (originalName) return this.commands.get(originalName)
    
    return undefined
  }
}