import dotenv from 'dotenv'
dotenv.config({ quiet: true })

import { MyClient } from './core/client/MyClient'

(async () => {
  const client = new MyClient()
  await client.init()

  client.eventsManager.events.forEach(event => {
    client.on(event.name, async (...args) => {
      try {
        await event.execute(...args)
      } catch (err) {
        console.error(`❌ Error during event ${event.name}`, err)
      }
    })
  })
})()