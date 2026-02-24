import { DbType } from "@/core/managers/LoggerManager"
import { ContainerBuilder, TextDisplayBuilder } from "discord.js"
import moment from "moment"
import { capitalizeFirstLetter } from "../../functions"

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
    .addTextDisplayComponents(
      new TextDisplayBuilder()
        .setContent(
          `## ${dbTypesData[dbType].label} ${entity.constructor.name.toLowerCase()}\n`+
          `\`💾\` ${propertiesLines.join(' | ')}${more ? ` | **More:** ${more}` : ``}.\n\n`+
          `-# ${moment().format('DD/MM/YYYY HH:mm')} · Gravis`
        )
    )
    .setAccentColor(dbTypesData[dbType].color)
}