import { EntityName, EventArgs, EventSubscriber } from "@mikro-orm/core"
import { delay, inject, injectable } from "tsyringe"
import { User } from "./User.entity"
import { Logger } from "@/core/managers/LoggerManager"
import { EmbedBuilder } from "discord.js"
import { ConfigManager } from "@/core/managers/ConfigManager"

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
    
    this.logger.discord(
      this.config.env.discordLogChannels.database,
      {
        embeds: [
          new EmbedBuilder()
            .setColor(0x57F287)
            .setTitle('New user')
            .addFields(
              { name: 'Id', value: user.id.toString(), inline: true },
              { name: 'Username', value: user.discordUsername, inline: true },
              { name: 'Discord ID', value: user.discordId, inline: true }
            )
            .setTimestamp()
        ]
      }
    )
  }
}