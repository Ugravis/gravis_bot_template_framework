import { EntityManager } from "@mikro-orm/mariadb";

export class GuildService {
  constructor(private em: EntityManager) {}
}