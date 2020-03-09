# PbTasksNgrxAuth

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.5.

## Development server

Run `npm start` within `server/` directory for API provision.<br/>
Run `ng serve` within `client/` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build client

Run `ng build` within `client/` to build the project. The build artifacts will be stored in the `client/dist/` directory. Use the `--prod` flag for a production build.

## Running production version

Run `npm start` within `/` directory. Navigate to `http://localhost:3000/`.

## Databases used

### Users stored in PostgreSQL database

Database name: michaelk<br/>
Table: users

| column        | type   |
| ------------- | ------ |
| user_id       | number |
| user_name     | string |
| user_password | string |

### Tasks stored in Mongo database

Database name: test<br/>
Collection name: tasks

| field            | value  |
| ---------------- | ------ |
| task_id          | number |
| task_name        | string |
| task_status      | number |
| assigned_user_id | number |

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
