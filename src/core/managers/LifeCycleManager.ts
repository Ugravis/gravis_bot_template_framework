import { singleton } from "tsyringe"
import { Logger } from "./LoggerManager"
import { DiscordClient } from "../DiscordClient"
import { DatabaseManager } from "./DatabaseManager"
import { ConfigManager } from "./ConfigManager"
import { dbBaseLogComponent, errorLogComponent } from "@/shared/utils/discord/components/logComponents"

@singleton()
export class LifecycleManager {
  private isShuttingDown = false

  constructor(
    private readonly logger: Logger,
    private readonly config: ConfigManager,
    private readonly discordClient: DiscordClient,
    private readonly database: DatabaseManager
  ) {}

  public register(): void {
    const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM']
    for (const signal of signals) {
      process.on(signal, () => this.shutdown(signal))
    }

    process.on('uncaughtException', async (e: Error) => {
      this.logger.error(`Uncaught Exception: ${e.message}\n${e.stack}`)
      await this.logger.discord(
        this.config.env.discordLogChannels.errors,
        { components: [errorLogComponent(e)] }
      )
      this.shutdown('uncaughtException', 1)
    })

    process.on('unhandledRejection', (r: unknown) => {
      this.logger.error(`Unhandled Rejection: ${r instanceof Error ? r.message : String(r)}`)
      this.shutdown('unhandledRejection', 1)
    })

    this.logger.info('LifecycleService registered')
  }

  public async shutdown(signal: string, code: number = 0): Promise<void> {
    if (this.isShuttingDown) return
    this.isShuttingDown = true

    this.logger.warn(`Shutting down... Reason: ${signal}`)

    try {
      await this.discordClient.destroy()
      this.logger.info('Discord client destroyed')
    } catch (e) {
      this.logger.error(`Failed to destroy Discord client: ${e}`)
    }

    try {
      await this.database.close()
      this.logger.info('Database connection closed')
    } catch (e) {
      this.logger.error(`Failed to close database connection: ${e}`)
    }

    process.exit(code)
  }
}