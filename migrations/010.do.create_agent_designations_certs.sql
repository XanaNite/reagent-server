CREATE TABLE agent_designations_certs(
    agent_id INTEGER REFERENCES agents(id) ON DELETE SET NULL,
    designations_certs_id INTEGER REFERENCES designations_certs(id) ON DELETE SET NULL,
);