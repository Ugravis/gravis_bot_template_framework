import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class User {
  @PrimaryKey()
  id!: number

  @Property({ unique: true })
  discordId!: string
  
  @Property()
  discordUsername!: string

  @Property()
  isBot!: boolean
}