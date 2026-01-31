import { Service } from "typedi";
import { BaseEvent } from "../BaseEvent";

export const DISCORD_EVENT_METADADA: (new (...args: any[]) => BaseEvent<any>)[] = []

export function DiscordEvent(): ClassDecorator {
  return (target) => {
    DISCORD_EVENT_METADADA.push(target as any)
    Service()(target)
  }
}