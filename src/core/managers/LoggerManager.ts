import { getClientGuildTextChannel } from "@/shared/functions/discord/discordBasics";
import { SendableChannels } from "discord.js";
import { MyClient } from "../client/MyClient";
import moment from "moment";
import chalk from "chalk";

export class LoggerManager {
  private errorLogChannel: SendableChannels | undefined

  constructor(private client: MyClient) {}

  public async init() {
    const errorLogConfig = this.client.envConfig.discord_log_channels.codeError
    this.errorLogChannel = getClientGuildTextChannel(this.client, errorLogConfig.guildId, errorLogConfig.channelId)
    if (!this.errorLogChannel) console.warn(`⚠️  LoggerManager: unable to get error log channel.`)
  }

  private getErrorText(context: string): string {
    return `❌ ${moment().format("DD/MM/YY HH:mm:ss")} | Error on [${context}]:`
  }

  private logToConsole(context: string, error: unknown) {
    console.error(chalk.bgRed(this.getErrorText(context)), error)
  }

  private async logToDiscord(context: string, error: unknown) {
    try {
      await this.errorLogChannel?.send(`\`${this.getErrorText(context)}\`\n\`\`\`\n${error}\n\`\`\``)
    } catch (err) {
      console.error(`⚠️  LoggerManager: can not send error message on Discord.`)
    }
  }

  public async error(context: string, error: unknown) {
    this.logToConsole(context, error)
    await this.logToDiscord(context, error)
  }
}