# Manifeste Technique : Gravis Framework (V2)

## 1. Vision et Philosophie

**Gravis** est un framework de bot Discord professionnel écrit en **TypeScript**. Il s'éloigne des scripts impératifs classiques pour proposer une approche **Orientée Objet (POO)** stricte. Le but est d'offrir une structure hautement scalable et modulaire, inspirée par la robustesse des frameworks backend modernes (par exemple Symfony) tout en restant optimisée pour les spécificités de l'API Discord.js.

## 2. Piliers Technologiques

* **Langage :** TypeScript (Mode Strict) pour un typage robuste.
* **Injection de Dépendances (DI) :** Utilisation de **TypeDI** pour orchestrer le cycle de vie des services et injecter les dépendances sans couplage fort.
* **Persistence (ORM) :** **MikroORM** (Data Mapper) pour une gestion fluide des données SQL avec support des transactions et du Unit of Work.
* **Discovery System :** Usage de **Décorateurs** pour l'identification automatique des commandes, événements et services par le moteur de réflexion, éliminant ainsi le besoin de parcours manuel des fichiers via `fs`.

## 3. Architecture Modulaire par "Features"

Le projet est structuré autour du dossier `src/features/`. Chaque feature est un domaine fonctionnel indépendant et complet.

### Anatomie d'une Feature (Exemple : `Economy`)

Chaque module regroupe ses propres ressources pour éviter la dispersion du code :

* **`entity/`** : Schémas de base de données (MikroORM).
* **`services/`** : Logique métier (calculs, interactions DB, repositories).
* **`commands/`** : Classes de commandes Discord (Slash Commands) utilisant les services injectés.
* **`events/`** : Listeners d'événements liés à la fonctionnalité.

Pour chaque feature liée à une base de données, le framework encourage la création de **commandes CRUD prêtes à l'emploi** (Create, Read, Update, Delete) pour manipuler les entrées directement depuis Discord.

## 4. Inversion de Contrôle et Découplage

Le framework repose sur le principe de **l'Inversion de Contrôle (IoC)** :

* **Anti-God Object :** Le `DiscordClient` n'est plus le point d'accès central (sac à outils). Les ressources (DB, Logger, Config) sont injectées par TypeDI uniquement là où elles sont nécessaires.
* **Cycle de Vie :** Les commandes et événements ne sont pas instanciés manuellement. Le framework les résout via le container TypeDI, permettant une gestion propre des singletons et des instances.

## 5. Automatisation et Scalabilité

* **Zéro Configuration Manuelle :** Grâce aux décorateurs, l'ajout d'une nouvelle commande ou d'un nouvel événement dans une feature est automatiquement détecté et enregistré au démarrage du bot.
* **Extensibilité :** La structure permet à plusieurs développeurs de travailler simultanément sur des fonctionnalités différentes sans collision dans le noyau (`core`) du système.
* **Professionnalisme :** Gestion d'erreurs centralisée, logging asynchrone et validation stricte des environnements.