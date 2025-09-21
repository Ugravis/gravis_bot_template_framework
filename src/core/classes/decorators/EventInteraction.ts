import { Service } from "typedi"
import { BaseEvent } from "../BaseEvent"

export const EVENT_INTERACTIONS: (new (...args: any[]) => BaseEvent<any>)[] = []

export function EventInteraction(): ClassDecorator {
  return target => {
    EVENT_INTERACTIONS.push(target as any)
    Service()(target as any)
  }
}