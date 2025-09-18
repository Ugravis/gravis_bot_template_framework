import { MyClient } from "../client/MyClient"

export abstract class BaseEvent {
  public client!: MyClient
  abstract name: string
  abstract description: string

  abstract execute(...args: unknown[]): Promise<void>
}