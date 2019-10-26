CREATE TABLE agent_specialization(
    agent_id INTEGER REFERENCES agents(id) ON DELETE SET NULL,
    specialization_id INTEGER REFERENCES specializations(id) ON DELETE SET NULL
);