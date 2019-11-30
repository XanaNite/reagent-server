CREATE TYPE phone_type AS ENUM (
    'cell',
    'business',
    'home',
    'fax'
);

ALTER TABLE agents
    ALTER COLUMN agent_phone_type TYPE phone_type;