## Gravis Template Framework - for @discord.js bot

WIP
```
gravis_template
├─ package-lock.json
├─ package.json
├─ src
│  ├─ core
│  │  ├─ classes
│  │  │  ├─ BaseEvent.ts
│  │  │  ├─ BaseInteraction.ts
│  │  │  ├─ BaseSlashCommand.ts
│  │  │  └─ decorators
│  │  │     ├─ DatabaseService.ts
│  │  │     ├─ EventInteraction.ts
│  │  │     └─ SlashCommandInteraction.ts
│  │  ├─ client
│  │  │  └─ MyClient.ts
│  │  ├─ config
│  │  │  ├─ core.config.ts
│  │  │  └─ core.config.types.ts
│  │  ├─ database
│  │  │  └─ Database.ts
│  │  └─ managers
│  │     ├─ DbServicesManager.ts
│  │     ├─ EventsManager.ts
│  │     ├─ InteractionsManager.ts
│  │     └─ LoggerManager.ts
│  ├─ features
│  │  ├─ events
│  │  │  └─ discord
│  │  │     ├─ client
│  │  │     │  └─ clientReady
│  │  │     │     └─ ClientReady.ts
│  │  │     └─ interaction
│  │  │        └─ interactionCreate
│  │  │           └─ InteractionCreate.ts
│  │  ├─ guilds
│  │  │  ├─ database
│  │  │  │  ├─ Guild.entity.ts
│  │  │  │  └─ Guild.service.ts
│  │  │  └─ interactions
│  │  └─ misc
│  │     └─ interactions
│  │        └─ ping
│  │           └─ Ping.ts
│  ├─ index.ts
│  └─ shared
│     └─ functions
│        ├─ discord
│        │  └─ discordBasics.ts
│        └─ system
│           └─ readdingFiles.ts
└─ tsconfig.json

```