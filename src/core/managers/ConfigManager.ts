import { singleton } from "tsyringe";
import { CORE_CONFIG } from "@/core/config/config";
import { CodeConfig, CommonConfig, CoreConfig, ENV_VAR_SCHEMA, EnvConfig, EnvVarSchema } from "@/core/config/config.types";

@singleton()
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

  public getEnvVar<K extends keyof EnvVarSchema>(name: K): EnvVarSchema[K] {
    const prefix = this.isProduction ? 'PROD_' : 'DEV_'
    const fullName = `${prefix}${name}`
    
    const raw = process.env[fullName]
    if (raw === undefined) throw new Error(`Missing env variable: ${fullName}`)

    if (this.isNumberKey(name)) {
      const parsed = Number(raw)
      if (Number.isNaN(parsed)) {
        throw new Error(`Env variable ${fullName} must be a number`)
      }
      return parsed as EnvVarSchema[K]
    }

    return raw as EnvVarSchema[K]
  }

  private isNumberKey(name: keyof EnvVarSchema): boolean {
    return ENV_VAR_SCHEMA[name] === Number
  }
}