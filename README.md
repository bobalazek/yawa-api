# YAWA (Yet Another Wellbeing App) API

This is the API for our app

## Commands

- Run: `npm run start:dev`
  - That will the development server. You can view the docs on <http://localhost:3000/api-docs>
- Run: `npm run typeorm:generate-migration src/database/migrations/{CamelCasedMigrationName}`
  - That will create a new diff migration. It will take your current database schema and compare it to the schema you want, depending on your models
- Run: `npm run typeorm:run-migrations`
  - That will create run the migration on the database

## TODO

- Before pushing to production, it would probably be good to validate that all ejs and yaml files are valid?
