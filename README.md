# YAWA (Yet Another Wellbeing App) API

This is the API for our app

## Getting started

- Install dependencies with `npm install`

## Commands

- `npm run start:dev` - this will start the development server. You will be able to view the docs on [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Database

- `npm run typeorm:generate-migration src/database/migrations/{migrationNameLowerCase}` - this will create a new diff migration. It will take your current database schema and compare it to the schema you want, depending on your models
- `npm run typeorm:run-migrations` - this will run the migrations on the database
- `npm run cli database:insert-seed-data` - this will enter the seed data
- `npm run typeorm:drop-schema` - this will drop the database schema
