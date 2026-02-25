import { ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder } from "discord.js"
import { User } from "../../database/User.entity"
import { version } from '../../../../../package.json'
import moment from "moment"

export function usersListComponent(users: User[]): ContainerBuilder {
  
  const container = new ContainerBuilder()
  
  container.addTextDisplayComponents(new TextDisplayBuilder().setContent(
    `## Db <User>`
  ))
  container.addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large))
  
  users.forEach((u, index) => {
    container.addTextDisplayComponents(
      new TextDisplayBuilder().setContent(
        `\`👤\` **\`[ID ${u.id}]\`** [\`${u.discordUsername}\`](https://discord.com)${u.isBot ? ` <:app:1476179710688886896>` : ''} | \`${u.discordId}\``
      )
    )
    if (index < users.length - 1) {
      container.addSeparatorComponents(
        new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
      )
    }
  })

  container.addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large))
  container.addTextDisplayComponents(new TextDisplayBuilder().setContent(
    `-# ${moment().format('DD/MM/YYYY HH:mm:ss')} · Gravis bot v${version}`
  ))

  return container
}