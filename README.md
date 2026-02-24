## Gravis Template Framework - for @discord.js bot

> TypeScript, Tsyringe, Discordjs

```
gravis_template
├─ package-lock.json
├─ package.json
├─ src
│  ├─ core
│  │  ├─ App.ts
│  │  ├─ DiscordClient.ts
│  │  ├─ classes
│  │  │  ├─ BaseCommand.ts
│  │  │  ├─ BaseEvent.ts
│  │  │  └─ commandCtx
│  │  │     ├─ BaseCommandCtx.ts
│  │  │     ├─ PrefixCommandCtx.ts
│  │  │     └─ SlashCommandCtx.ts
│  │  ├─ config
│  │  │  ├─ config.ts
│  │  │  └─ config.types.ts
│  │  └─ managers
│  │     ├─ CommandsManager.ts
│  │     ├─ ConfigManager.ts
│  │     ├─ EventsManager.ts
│  │     └─ LoggerManager.ts
│  ├─ features
│  │  ├─ events
│  │  │  └─ discord
│  │  │     ├─ client
│  │  │     │  └─ ready
│  │  │     │     └─ ClientReady.event.ts
│  │  │     ├─ interaction
│  │  │     │  └─ interactionCreate
│  │  │     │     └─ InteractionCreate.event.ts
│  │  │     └─ message
│  │  │        └─ messageCreate
│  │  │           └─ MessageCreate.event.ts
│  │  └─ misc
│  │     └─ interactions
│  │        └─ ping
│  │           └─ Ping.cmd.ts
│  ├─ index.ts
│  └─ shared
│     └─ utils
│        ├─ discord
│        │  └─ DiscordUtils.ts
│        └─ system
│           └─ fileLoader.ts
└─ tsconfig.json

```