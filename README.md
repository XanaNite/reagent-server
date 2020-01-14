# REagent.com API Server

This app is a real estate agent's dashboard that will be editable and supply information to a public profile for users to view

Live: 
client: https://reagent.now.sh/
server:  https://aqueous-lake-82914.herokuapp.com/

Client Repo: https://github.com/XanaNite/reagent.com-client

## Technologies Used

Express/Postgresql/Nodejs/Postman/DBeaver

## API Endpoints/Documentation
https://aqueous-lake-82914.herokuapp.com/api/agents </br>
https://aqueous-lake-82914.herokuapp.com/auth

### Agents Endpoint
```conf
# GET all agents --> http://localhost:8000/api/agents` 
# GET agent via id --> http://localhost:8000/api/agents/${pupId}`
# HTTP RESPONSE: 200
# - Example Response Body of /agents/1 - 

{
    "id": 1,
    "first_name": "Test",
    "last_name": "User",
    "title": "Agent",
    "agent_phone": "3337771515",
    "agent_phone_type": "home",
    "agent_email": "user1@test.com",
    "city": "The Shire",
    "state": "Middle Earth",
    "zip": "",
    "office": "Gandalf Real Estate in The Shire",
    "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas congue quisque egestas diam in. Orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Volutpat diam ut venenatis tellus in metus. Eget sit amet tellus cras adipiscing enim. Sed faucibus turpis in eu mi bibendum neque egestas congue. Nec dui nunc mattis enim. Enim diam vulputate ut pharetra sit amet aliquam id diam. In aliquam sem fringilla ut morbi tincidunt augue interdum velit. Adipiscing enim eu turpis egestas. Eget velit aliquet sagittis id consectetur purus ut. Nunc lobortis mattis aliquam faucibus purus in massa tempor nec. Nulla malesuada pellentesque elit eget gravida cum. Id consectetur purus ut faucibus. Cras pulvinar mattis nunc sed blandit libero volutpat sed cras. Dictum fusce ut placerat orci nulla pellentesque. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet.",
    "experience": "50",
    "brokerage": "Gandalf Real Estate",
    "slogan": "I will sell your precious!",
    "date_created": "2020-01-12T22:50:38.262Z",
    "date_modified": "2020-01-13T04:21:54.984Z",
    "password": "$2a$12$cuC.CiBXFgCBizCL/j9QQeEIZON6oR0Jbf7SEz9DkC7nGHnLmFmgq"
}

```

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests in watch mode `npm test`

Migrate the dev database `npm run migrate`

Migrate the test database `npm run migrate:test`

## Configuring Postgres

For tests involving time to run properly, configure your Postgres database to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
   1. E.g. for an OS X, Homebrew install: `/usr/local/var/postgres/postgresql.conf`
   2. E.g. on Windows, _maybe_: `C:\Program Files\PostgreSQL\11.2\data\postgresql.conf`
2. Find the `timezone` line and set it to `UTC`:

```conf
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```