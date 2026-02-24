import { BaseCommand, CommandScope } from "@/core/classes/BaseCommand";
import { BaseCommandCtx } from "@/core/classes/commandCtx/BaseCommandCtx";
import { injectable } from "tsyringe";

@injectable()
export default class PingCommand extends BaseCommand {
  public readonly name = 'ping'
  public readonly description = 'replies with pong'
  public readonly scope = ['slash', 'prefix'] as const
  public readonly alias = ['p']

  public async execute(cmd: BaseCommandCtx): Promise<void> {
    await cmd.reply({ content: 'Pong' })
  }
}