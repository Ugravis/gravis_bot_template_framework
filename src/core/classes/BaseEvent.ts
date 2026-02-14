import { ClientEvents } from 'discord.js';
import { AppContext } from '../AppContext';

export abstract class BaseEvent<K extends keyof ClientEvents> {
  abstract readonly name: K;
  public readonly once: boolean = false;

  constructor(protected ctx: AppContext) {}

  abstract execute(...args: ClientEvents[K]): Promise<void> | void;
}