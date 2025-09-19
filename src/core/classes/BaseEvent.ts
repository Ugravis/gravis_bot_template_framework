import { MyClient } from "../client/MyClient"

export abstract class BaseEvent<T extends any[]> {
  public client!: MyClient
  abstract name: string
  abstract description: string

  abstract execute(...args: T): Promise<void>
}