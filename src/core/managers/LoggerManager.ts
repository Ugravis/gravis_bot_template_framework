import { DiscordUtils } from "@/shared/utils/discord/DiscordUtils"
import { ContainerBuilder } from "discord.js"
import { delay, inject, singleton } from "tsyringe"
import { DiscordChannelConfig } from "../config/config.types"
import chalk, { ChalkInstance } from "chalk"
import moment from "moment"

interface LogLevel {
  name: string
  bgColor: typeof chalk
  fontColor: typeof chalk
}

export type DbType = 'create' | 'update' | 'delete'

const INFO:  LogLevel = { name: 'info', bgColor: chalk.bgGreen, fontColor: chalk.green }
const WARN:  LogLevel = { name: 'warn', bgColor: chalk.bgYellow, fontColor: chalk.yellow }
const ERROR: LogLevel = { name: 'error', bgColor: chalk.bgRed, fontColor: chalk.red }
const DB:    LogLevel = { name: 'db', bgColor: chalk.bgMagenta, fontColor: chalk.magenta }

interface BufferedComponent {
  component: ContainerBuilder
  channel: DiscordChannelConfig 
}

interface DiscordLogOptions {
  components: ContainerBuilder[]
}

@singleton()
export class Logger {
  private buffer: BufferedComponent[] = []
  private timer: NodeJS.Timeout | null = null
  private readonly DEBOUNCE_MS = 3000
  private readonly MAX_COMPONENTS_PER_MESSAGE = 10

  constructor(
    @inject(delay(() => DiscordUtils))
    private readonly discordUtils: DiscordUtils
  ) {}

  private readonly dbColors: Record<DbType, ChalkInstance> = {
    create: chalk.bgGreen,
    update: chalk.bgYellow,
    delete: chalk.bgRed,
  }

  private readonly dbLabels: Record<DbType, string> = {
    create: 'CREATED',
    update: 'UPDATED',
    delete: 'DELETED',
  }

  private log(
    type: LogLevel,
    message: string,
    dbType?: DbType,
    entityName?: string
  ): void {
    
    const dbTag = dbType && entityName
      ? `${this.dbColors[dbType].bold(`[${this.dbLabels[dbType]} ${entityName.toUpperCase()}]`)} `
      : ''
    
    console.log(
      `${type.bgColor.bold(`[${type.name.padEnd(5).toUpperCase()}]`)} `+
      type.fontColor(`${moment().format('DD/MM/YYYY HH:mm')} - `)+
      `${dbTag}` +
      type.fontColor(`${message}`)
    )
  }

  public info(message: string): void { this.log(INFO, message) }
  public error(message: string): void { this.log(ERROR, message) }
  public warn(message: string): void { this.log(WARN, message) }

  public db(dbType: DbType, entityName: string, message: string): void {
    this.log(DB, message, dbType, entityName)
  }

  private dbLogColors: Record<DbType, (text: string) => string> = {
    create: chalk.bgGreen.black,
    update: chalk.bgYellow.black,
    delete: chalk.bgRed.white
  }

  public discord(
    channel: DiscordChannelConfig, 
    options: DiscordLogOptions
  ): void {
    this.buffer.push(...options.components.map(component => ({ component, channel })))
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => this.flushDiscord(), this.DEBOUNCE_MS)
  }

  private async flushDiscord(): Promise<void> {
    if (!this.buffer.length) return

    const items = [...this.buffer]
    this.buffer = []
    this.timer = null

    const byChannel = items.reduce((acc, item) => {
      const key = item.channel.channelId
      if (!acc[key]) acc[key] = []
      acc[key].push(item)
      return acc
    }, {} as Record<string, BufferedComponent[]>)

    for (const group of Object.values(byChannel)) {
      const components = group.map(i => i.component)
      const channel = group[0].channel

      for (const chunk of this.chunk(components, this.MAX_COMPONENTS_PER_MESSAGE)) {
        await this.discordUtils.sendClientConfigMessage(channel, { components: chunk, flags: ['IsComponentsV2'] })
      }
    }
  }

  private chunk<T>(arr: T[], size: number): T[][] {
    const result: T[][] = []
    for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size))
    return result
  }
}