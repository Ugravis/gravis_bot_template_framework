import { DbType } from "@/core/managers/LoggerManager"
import { ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder } from "discord.js"
import { capitalizeFirstLetter } from "../../functions"
import { version } from '../../../../../package.json'
import moment from "moment"

interface DbTypeData {
  label: string
  color: number
}

const dbTypesData: Record<DbType, DbTypeData> = {
  create: { label: 'New', color: 0x57F287 },
  update: { label: 'Updated', color: 0xFEE75C },
  delete: { label: 'Deleted', color: 0xED4245 }
}

export function dbBaseLogComponent<T extends Record<string, any>>(
  dbType: DbType, 
  entity: T,
  more?: string
): ContainerBuilder {
  let propertiesLines: string[] = []

  for (const key in entity) {
    if (Object.prototype.hasOwnProperty.call(entity, key)) {
      const value = entity[key]
      propertiesLines.push(`**${capitalizeFirstLetter(key)}:** \`${value}\``)
    }
  }
  
  return new ContainerBuilder()
    .addTextDisplayComponents(new TextDisplayBuilder().setContent(
      `## ${dbTypesData[dbType].label} ${entity.constructor.name.toLowerCase()}\n`+
      `\`💾\` ${propertiesLines.join(' | ')}${more ? ` | **More:** ${more}` : ``}.\n\n`
    ))
    .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large))
    .addTextDisplayComponents(new TextDisplayBuilder().setContent(`-# ${moment().format('DD/MM/YYYY HH:mm:ss')} · Gravis bot v${version}`))
    .setAccentColor(dbTypesData[dbType].color)
}

export function errorLogComponent(error: Error): ContainerBuilder {
  return new ContainerBuilder()
    .addTextDisplayComponents(new TextDisplayBuilder().setContent(`## ${error.name}\n**\`❌ ${error.message}\`**\n\n`))
    .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large))
    .addTextDisplayComponents(new TextDisplayBuilder().setContent(`\`\`\`\n${error.stack}\`\`\`\n`))
    .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large))
    .addTextDisplayComponents(new TextDisplayBuilder().setContent(`-# ${moment().format('DD/MM/YYYY HH:mm:ss')} · Gravis bot v${version}`))
    .setAccentColor(0xED4245)
}

export function shutdownLogComponent(signal: string): ContainerBuilder {
  return new ContainerBuilder()
    .addTextDisplayComponents(new TextDisplayBuilder().setContent(`### Shut down\nReason: **\`${signal.toUpperCase()}\`**`))
    .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large))
    .addTextDisplayComponents(new TextDisplayBuilder().setContent(`-# ${moment().format('DD/MM/YYYY HH:mm:ss')} · Gravis bot v${version}`))
    .setAccentColor(0xFEE75C)
}