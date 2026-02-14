import { ConfigManager } from "./managers/ConfigManager";
import { Logger } from "./managers/LoggerManager";

export interface AppContext {
  logger: Logger
  config: ConfigManager
}