import { Client, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder } from "discord.js";
import moment from "moment";

export function clientReadyComponent(client: Client): ContainerBuilder {
  return new ContainerBuilder()
    .addTextDisplayComponents(new TextDisplayBuilder().setContent(`### Ready\n**\`${client.user?.tag}\`**`))
    .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large))
    .addTextDisplayComponents(new TextDisplayBuilder().setContent(`-# ${moment().format('DD/MM/YYYY HH:mm:ss')} · Gravis bot`))
    .setAccentColor(0x57F287)
}