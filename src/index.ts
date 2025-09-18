import dotenv from 'dotenv'
dotenv.config({ quiet: true })

import { MyClient } from './core/client/MyClient'

// import { DiscClient } from '@/core/client/DiscClient'

// (async () => {
//   const client = new DiscClient()
//   await client.init()

//   client.eventsManager.events.forEach(event => {
//     client.on(event.name, async (...args) => {
//       try {
//         // Middleware before
//         await event.execute(client, ...args)
//         // Middleware after

//       } catch (err) {
//         console.error(`❌ Error during event ${event.name}`, err)
//       }
//     })
//   })
// })()

(async () => {
  const client = new MyClient()
  await client.init()
})()