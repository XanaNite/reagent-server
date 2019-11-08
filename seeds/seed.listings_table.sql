BEGIN;

TRUNCATE
  listings
  RESTART IDENTITY CASCADE;

INSERT INTO listings ()
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