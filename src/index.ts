import "reflect-metadata"
import dotenv from 'dotenv'
import { App } from '@/core/App'
import { container } from "tsyringe"

dotenv.config({ quiet: true })

async function bootstrap() {
  const app = container.resolve(App)
  await app.init()
}

bootstrap().catch(e => { 
  console.log(`Failed to load application: `, e) 
  process.exit(1)
})