import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "guilds" })
export class Guild {
  @PrimaryKey({ type: 'number' })
  id!: number

  @Property({ type: 'string', unique: true })
  discordId!: string

  @Property({ type: 'text' })
  name!: string

  @Property({ type: 'string' })
  ownerDiscordId!: string

  @Property({ type: 'text' })
  ownerUsername!: string
}