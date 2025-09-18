import { DiscClient } from "../DiscClient"

export abstract class BaseEvent {
  abstract name: string
  abstract description: string

  abstract execute(client: DiscClient, ...args: unknown[]): Promise<any> | any
}