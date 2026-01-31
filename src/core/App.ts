import { Client } from "@/core/Client";
import { EventManager } from "@/core/managers/EventManager";
import { ConfigManager } from "./managers/ConfigManager";

export class App {
  private readonly configManager: ConfigManager
  private readonly client: Client
  private readonly eventManager: EventManager

  constructor() {
    this.configManager = new ConfigManager()
    this.client = new Client(
      this.configManager
    )
    this.eventManager = new EventManager(
      this.configManager,
      this.client.getNativeClient()
    )
    this.setupGracefulShutdown()
  }

  public async start(): Promise<void> {
    await this.eventManager.init()
    await this.client.connect()
    console.log(`✅ System started`)
  }

  public async shutdown(): Promise<void> {
    await this.client.disconnect()
    console.log(`🛑 Bot stopped`)
    process.exit(1)
  }

  private setupGracefulShutdown(): void {
    process.on('SIGINT', () => this.shutdown())
    process.on('SIGTERM', () => this.shutdown())
  }
}