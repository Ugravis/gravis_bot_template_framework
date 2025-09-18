import { MyClient } from "../client/MyClient"

export abstract class BaseEvent {
  abstract name: string
  abstract description: string

  abstract execute(client: MyClient, ...args: unknown[]): Promise<any>
}