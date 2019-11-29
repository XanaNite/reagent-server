CREATE TYPE agent_phone_type AS ENUM (
    'cell',
    'business',
    'home',
    'fax'
);

ALTER TABLE agents
    ADD COLUMN
        style agent_phone_type;