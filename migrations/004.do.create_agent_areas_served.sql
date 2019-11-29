CREATE TABLE agent_areas_served(
    agent_id INTEGER REFERENCES agents(id) ON DELETE SET NULL,
    areas_served_id INTEGER REFERENCES areas_served(id) ON DELETE SET NULL
);