import { EntityManager, MikroORM } from "@mikro-orm/mariadb";
import { container, singleton } from "tsyringe";
import { Logger } from "./LoggerManager";
import { ConfigManager } from "./ConfigManager";

@singleton()
export class DatabaseManager {
  private _orm!: MikroORM

  constructor(
    private readonly logger: Logger,
    private readonly config: ConfigManager
  ) {}

  public async init(): Promise<void> {
    this._orm = await MikroORM.init({
      dbName: this.config.getEnvVar('DB_NAME'),
      user: this.config.getEnvVar('DB_USERNAME'),
      password: this.config.getEnvVar('DB_PASSWORD'),
      host: this.config.getEnvVar('DB_HOST'),
      port: this.config.getEnvVar('DB_PORT'),
      entities: this.config.code.database.entities,
      subscribers: this.config.code.database.subscribers.map(S => container.resolve(S))
    })

    const generator = this._orm.schema
    
    if (!this.config.isProduction) {
      await generator.refreshDatabase()
      this.logger.warn('Database reset (dev mode)')
    } else {
      await generator.updateSchema()
    }

    this.logger.info(`Database connected`)
  }

  public get orm(): MikroORM { 
    return this._orm 
  }
  
  public get em(): EntityManager { 
    return this._orm.em 
  }

  public async close(): Promise<void> {
    await this._orm.close()
  }
}