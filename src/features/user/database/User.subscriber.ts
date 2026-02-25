import { EntityName, EventArgs, EventSubscriber } from "@mikro-orm/core"
import { delay, inject, injectable } from "tsyringe"
import { User } from "./User.entity"
import { Logger } from "@/core/managers/LoggerManager"
import { EmbedBuilder } from "discord.js"
import { ConfigManager } from "@/core/managers/ConfigManager"
import { dbBaseLogComponent } from "@/shared/utils/discord/components/logComponents"

@injectable()
export class UserSubscriber implements EventSubscriber<User> {
  constructor(
    @inject(delay(() => Logger))
    private readonly logger: Logger,
    @inject(delay(() => ConfigManager))
    private readonly config: ConfigManager
  ) {}

  getSubscribedEntities(): EntityName<User>[] {
    return [User]
  }

  async afterCreate(args: EventArgs<User>): Promise<void> {
    const { entity: user } = args

    this.logger.db('create', 'user', `${user.discordUsername} (discordId: ${user.discordId})`)
    
    this.logger.discordChunk(
      this.config.env.discordLogChannels.database,
      { components: [dbBaseLogComponent('create', user, `<@${user.discordId}>`)] }
    )
  }
}