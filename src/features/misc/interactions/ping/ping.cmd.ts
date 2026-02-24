import { BaseCommand, CommandScope } from "@/core/classes/BaseCommand";
import { BaseCommandCtx } from "@/core/classes/commandCtx/BaseCommandCtx";
import { SlashCommandBuilder } from "discord.js";
import { injectable } from "tsyringe";

@injectable()
export default class PingCommand extends BaseCommand {
  public readonly name = 'ping'
  public readonly description = 'replies with pong'
  public readonly scope = ['slash', 'prefix'] as const
  public readonly alias = ['p']

  // protected commandBuild(builder: SlashCommandBuilder) {
  //   builder
  //     .addStringOption(opt => opt
  //       .setName('test')
  //       .setDescription('desc du test')
  //       .setRequired(true)
  //     )
  //     .addNumberOption(opt => opt
  //       .setName('test2')
  //       .setDescription('la desc2')
  //       .setRequired(true)
  //     )
  //     .addNumberOption(opt => opt
  //       .setName('test3')
  //       .setDescription('lalllalala 3')
  //       .setRequired(false)
  //     )
  //   return builder
  // }

  public async execute(cmd: BaseCommandCtx): Promise<void> {
    await cmd.reply({ content: `Pong` })
  }
}