import { CORE_CONFIG } from "../config/config";
import { CodeConfig, CommonConfig, CoreConfig, EnvConfig } from "../config/config.types";

export class ConfigManager {
  private readonly config: CoreConfig = CORE_CONFIG
  private readonly isProd: boolean = process.env.NODE_ENV === 'production'

  public get env(): EnvConfig {
    return this.isProd 
      ? this.config.prod
      : this.config.dev
  }

  public get code(): CodeConfig { 
    return this.config.code
  }

  public get common(): CommonConfig { 
    return this.config.common 
  }

  public get isProduction(): boolean {
    return this.isProd
  }

  //

  public get token(): string {
    return this.isProduction
      ? process.env.PROD_BOT_TOKEN!
      : process.env.DEV_BOT_TOKEN!
  }
}

export const config = new ConfigManager()