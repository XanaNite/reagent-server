CREATE TABLE agents(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_name TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    date_modified TIMESTAMP,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    agent_phone TEXT NOT NULL,
    agent_phone_type TEXT NOT NULL,
    agent_email TEXT NOT NULL,
    title TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip INTEGER NOT NULL,
    office TEXT,
    bio TEXT,
    experience INTEGER,
    brokerage TEXT NOT NULL,
    slogan TEXT,
    price_min INTEGER,
    price_max INTEGER
);

