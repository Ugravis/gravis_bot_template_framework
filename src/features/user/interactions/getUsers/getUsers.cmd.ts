import { BaseCommand } from "@/core/classes/BaseCommand"
import { BaseCommandCtx } from "@/core/classes/commandCtx/BaseCommandCtx"
import { injectable } from "tsyringe"
import { UserService } from "../../database/User.service"
import { User } from "../../database/User.entity"
import { usersListComponent } from "../../shared/components/usersListComponent"

@injectable()
export default class GetUsers extends BaseCommand {
  public readonly name = 'get-users'
  public readonly description = `Renvoie la liste des utilisateurs enregistrés dans la bdd (User, Crud)`
  public readonly scope = ['prefix'] as const
  public readonly alias = ['users']

  constructor(
    private readonly userService: UserService
  ) { super() }

  public async execute(cmd: BaseCommandCtx): Promise<void> {
    const users: User[] = await this.userService.findAll()
    cmd.reply({
      components: [usersListComponent(users)]
    })
  }
}