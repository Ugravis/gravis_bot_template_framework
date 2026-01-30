import 'reflect-metadata'
import dotenv from 'dotenv'
import Container from 'typedi'
import { MyClient } from './core/MyClient'

dotenv.config({ quiet: true })

async function bootstrap() {
  const client = Container.get(MyClient)
  await client.init()
}

bootstrap().catch(console.error)