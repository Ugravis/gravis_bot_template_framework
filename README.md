
```
gravis_template
├─ package-lock.json
├─ package.json
├─ src
│  ├─ core
│  │  ├─ baseClasses
│  │  │  ├─ BaseButtonCommand.ts
│  │  │  ├─ BaseClassicCommand.ts
│  │  │  ├─ BaseEvent.ts
│  │  │  ├─ BaseInteraction.ts
│  │  │  ├─ BaseModalSubmitCommand.ts
│  │  │  └─ BaseSlashCommand.ts
│  │  ├─ client
│  │  │  └─ DiscClient.ts
│  │  └─ loaders
│  │     ├─ EventManager.ts
│  │     └─ InteractionsManager.ts
│  ├─ events
│  │  ├─ custom
│  │  └─ discord
│  │     ├─ client
│  │     │  └─ ready
│  │     │     └─ clientReady.event.ts
│  │     └─ interaction
│  │        └─ interactionCreate.ts
│  ├─ features
│  │  └─ misc
│  │     └─ interactions
│  │        └─ ping
│  │           └─ ping.cmd.ts
│  └─ index.ts
└─ tsconfig.json

```