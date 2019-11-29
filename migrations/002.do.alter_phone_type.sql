CREATE TYPE phone_type AS ENUM (
    'cell',
    'business',
    'home',
    'fax'
);

ALTER TABLE agent
    ALTER COLUMN agent_phone_type TYPE phone_type;