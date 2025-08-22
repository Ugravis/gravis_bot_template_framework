import dotenv from 'dotenv'
dotenv.config({ quiet: true })

import { DiscClient } from '@/core/DiscClient'

(async () => {
  const discBot = new DiscClient()
  await discBot.init()
})()