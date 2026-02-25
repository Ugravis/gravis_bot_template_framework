import { DatabaseManager } from "@/core/managers/DatabaseManager";
import { User as DiscordUser } from "discord.js";
import { singleton } from "tsyringe";
import { User } from "./User.entity";
import { UserRepository } from "./User.repository";

@singleton()
export class UserService {
  constructor(
    private readonly db: DatabaseManager,
    private readonly userRepository: UserRepository
  ) {}


  public async upsert(discordUser: DiscordUser): Promise<User> {
    const em = this.db.em.fork()

    let user = await this.userRepository.findByDiscordId(em, discordUser.id)

    if (!user) {
      user = em.create(User, {
        discordId: discordUser.id,
        discordUsername: discordUser.username,
        isBot: discordUser.bot
      })
      em.persist(user)
    } else {
      user.discordUsername = discordUser.username
    }

    await em.flush()
    return user
  }

  public async findAll(): Promise<User[]> {
    const em = this.db.em.fork()
    return this.userRepository.findAll(em)
  }
}