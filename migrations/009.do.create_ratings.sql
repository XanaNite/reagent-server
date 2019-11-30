CREATE TABLE IF NOT EXISTS ratings(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    source TEXT NOT NULL,
    overall INTEGER NOT NULL,
    responsiveness INTEGER NOT NULL,
    negotiation_skills INTEGER NOT NULL,
    professionalism INTEGER NOT NULL,
    market_expertise INTEGER NOT NULL,
    comments TEXT,
    agent_id INTEGER REFERENCES agents(id) ON DELETE SET NULL
);