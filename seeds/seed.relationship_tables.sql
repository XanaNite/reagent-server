BEGIN;

TRUNCATE
  agent_areas_served,
  agent_designations_certs,
  agent_specialization,
  RESTART IDENTITY CASCADE;

INSERT INTO agent_areas_served ()
VALUES
  (),
  (),
  (),
  (),
  (),
  (),
  (),
  ();

INSERT INTO agent_designations_certs ()
VALUES
  (),
  (),
  (),
  (),
  (),
  (),
  (),
  ();

INSERT INTO agent_specialization ()
VALUES
  (),
  (),
  (),
  (),
  (),
  (),
  (),
  ();

COMMIT;