import 'reflect-metadata'
import dotenv from 'dotenv'
import { App } from '@/core/App'

dotenv.config({ quiet: true })

async function bootstrap(): Promise<void> {
  const app = new App()

  try { await app.start() } 
  catch (e) { 
    console.error(`Bootsrap error: `, e) 
    process.exit(1)
  }
}

bootstrap()