import { BaseCommand } from "@/core/classes/BaseCommand";
import { BaseCommandCtx } from "@/core/classes/commandCtx/BaseCommandCtx";
import { LifecycleManager } from "@/core/managers/LifeCycleManager";
import { injectable } from "tsyringe";

@injectable()
export default class ShutdownCommand extends BaseCommand {
  public readonly name = 'shutdown'
  public readonly description = 'shutdown application'
  public readonly scope = ['prefix'] as const
  public readonly alias = ['quit', 'stop']

  constructor(
    private readonly lifeCycleManager: LifecycleManager
  ) { super() }

  public async execute(cmd: BaseCommandCtx): Promise<void> {
    await cmd.reply({ content: `Shutting down...` })
    await this.lifeCycleManager.shutdown('shutdown command')
  }
}