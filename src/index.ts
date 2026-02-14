import dotenv from 'dotenv'
import { App } from './core/App'

dotenv.config({ quiet: true })

async function bootstrap() {
  const app = new App()
  await app.init()
}

bootstrap().catch(e => { 
  console.log(`Failed to load application: `, e) 
  process.exit(1)
})