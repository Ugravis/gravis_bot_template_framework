import { Client } from "@/core/Client";
import { EventManager } from "@/core/managers/EventManager";

export class App {
  private readonly client: Client
  private readonly eventManager: EventManager

  constructor() {
    this.client = new Client()
    this.eventManager = new EventManager(this.client.getNativeClient())
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