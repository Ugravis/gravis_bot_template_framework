import { Service } from "typedi"

export const DATABASE_SERVICES: (new (...args: []) => any)[] = [] /* */

export function DatabaseService(): ClassDecorator {
  return target => {
    DATABASE_SERVICES.push(target as any)
    Service()(target as any)
  }
}