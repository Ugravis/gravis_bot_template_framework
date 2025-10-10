import { DatabaseService } from "@/core/classes/decorators/DatabaseService";
import { EntityManager } from "@mikro-orm/mariadb";
import { Guild } from "./Guild.entity";

@DatabaseService()
export class GuildService {
  constructor(private em: EntityManager) {}

  async findById(id: number) {
    return this.em.findOne(Guild, { id })
  }
}