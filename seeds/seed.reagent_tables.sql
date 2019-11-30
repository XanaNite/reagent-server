BEGIN;

TRUNCATE
  areas_served,
  specializations,
  ratings,
  recommendations
  RESTART IDENTITY CASCADE;

INSERT INTO areas_served (zip, area)
VALUES
  (
      '33533',
      'Misty Mountains'
  ),
  (
      '44544',
      'Emyn Beraid'
  ),
  (
      '65666',
      'Mount Doom'
  ),
  (
      '88588',
      'Weathertop'
  );

INSERT INTO specializations (specialization)
VALUES
  ('second breakfast'),
  ('tea'),
  ('lunch'),
  ('third breakfast');

INSERT INTO ratings (
  name, 
  city, 
  state, 
  source, 
  overall, 
  responsiveness, 
  negotiation_skills, 
  professionalism, 
  market_expertise, 
  comments, 
  agent_id
) VALUES
  (
    'Tom',
    'Phoenix',
    'AZ',
    'REagent.com',
    5,
    5,
    5,
    5,
    5,
    'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
    1
  ),
  (
    'Sally',
    'Peoria',
    'IL',
    'REagent.com',
    4,
    4,
    5,
    5,
    5,
    'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
    1
  );

INSERT INTO recommendations (name, comments, agent_id)
VALUES
  (
    'Sue',
    'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
    1
  ),
  (
    'Logan',
    'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
    1
  );

COMMIT;