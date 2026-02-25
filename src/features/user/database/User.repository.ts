import { EntityManager } from "@mikro-orm/mariadb"
import { singleton } from "tsyringe"
import { User } from "./User.entity"

@singleton()
export class UserRepository {

  async findByDiscordId(em: EntityManager, discordId: string): Promise<User | null> {
    return em.findOne(User, { discordId })
  }


  async findById(em: EntityManager, id: number): Promise<User | null> {
    return em.findOne(User, id)
  }


  async findAll(em: EntityManager): Promise<User[]> {
    return em.findAll(User)
  }
}