import { DiscClient } from "../client/DiscClient"

export abstract class BaseEvent {
  abstract name: string
  abstract description: string

  abstract execute(client: DiscClient, ...args: any[]): Promise<any> | any
}