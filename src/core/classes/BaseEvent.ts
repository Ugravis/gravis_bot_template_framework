import { ClientEvents } from 'discord.js'

export abstract class BaseEvent<K extends keyof ClientEvents> {
  abstract readonly name: K
  public readonly once: boolean = false

  abstract execute(...args: ClientEvents[K]): Promise<void> | void
}