import { EntityManager, MariaDbDriver, MikroORM, MySqlConnection } from "@mikro-orm/mariadb";
import { MyClient } from "../client/MyClient";
import { Options } from "@mikro-orm/core";
import { Guild } from "@/features/guilds/models/Guild";

export class DatabaseManager {
  private orm!: MikroORM
  private em!: EntityManager
  private mikroConfig: Options<MariaDbDriver>

  constructor(private client: MyClient) {
    this.mikroConfig = {
      dbName: this.client.isDevEnv() ? process.env.DEV_DB_NAME! : process.env.PROD_DB_NAME!,
      user: this.client.isDevEnv() ? process.env.DEV_DB_USERNAME! : process.env.PROD_DB_USERNAME!!,
      password: this.client.isDevEnv() ? process.env.DEV_DB_PASSWORD! : process.env.PROD_DB_PASSWORD!,
      host: this.client.isDevEnv() ? process.env.DEV_DB_HOST! : process.env.PROD_DB_HOST!,
      port: this.client.coreConfig.code.database.port,
      entities: [Guild]
    }
  }

  public async init() {
    try {
      this.orm = await MikroORM.init(this.mikroConfig)
      this.em = this.orm.em.fork()
      console.log("✅ Database connected")
    } catch (err) {
      await this.client.logger.error("Database connection", err)
    }
  }

  public getOrm(): MikroORM {
    return this.orm
  }

  public getEm(): EntityManager {
    return this.em
  }
}