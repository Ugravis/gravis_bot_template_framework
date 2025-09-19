import { Sequelize } from "sequelize";
import { MyClient } from "../client/MyClient";

export class Database {
  private sequelize: Sequelize

  constructor(private client: MyClient) {
    this.sequelize = new Sequelize(
      this.client.isDevEnv() ? process.env.DEV_DB_NAME! : process.env.PROD_DB_NAME!,
      this.client.isDevEnv() ? process.env.DEV_DB_USERNAME! : process.env.PROD_DB_USERNAME!,
      this.client.isDevEnv() ? process.env.DEV_DB_PASSWORD! : process.env.PROD_DB_PASSWORD!,
      {
        host: this.client.isDevEnv() ? process.env.DEV_DB_HOST : process.env.PROD_DB_HOST,
        dialect: 'mariadb',
        dialectOptions: {
          timezone: 'Etc/GMT-2'
        },
        logging: false
      }
    )
  }

  public async init() {
    try {
      this.sequelize.sync({ force: true })
      console.log("✅ Database connected")
    } catch (err) {
      await this.client.logger.error("Database connection", err)
    }
  }
}