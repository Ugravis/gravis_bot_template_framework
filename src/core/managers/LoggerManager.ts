import { singleton } from "tsyringe"

@singleton()
export class Logger {
  private log(
    type: 'info' | 'error',
    message: string
  ): void {
    console.log(`[${type}] ${new Date().toLocaleDateString()} - ${message}`)
  }

  public info(message: string): void {
    this.log('info', message)
  }

  public error(message: string): void {
    this.log('error', message)
  }
}