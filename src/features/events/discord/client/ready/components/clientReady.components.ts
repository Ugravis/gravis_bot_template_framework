import { Client, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder } from "discord.js";
import { version } from '../../../../../../../package.json'
import moment from "moment";

export function clientReadyComponent(
  client: Client,
  totalEvents: number,
  totalCommands: number,
  dbName: string
): ContainerBuilder {

  return new ContainerBuilder()
    .addTextDisplayComponents(new TextDisplayBuilder().setContent(
      `### Ready\n`+
      `**Client:** \`${client.user?.tag}\` | **Events:** \`${totalEvents}\` | **Commands:** \`${totalCommands}\` | **DbName:** \`${dbName.toUpperCase()}\`.`
    ))
    .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large))
    .addTextDisplayComponents(new TextDisplayBuilder().setContent(`-# ${moment().format('DD/MM/YYYY HH:mm:ss')} · Gravis bot v${version}`))
    .setAccentColor(0x57F287)
}