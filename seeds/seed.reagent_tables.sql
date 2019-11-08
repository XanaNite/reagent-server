BEGIN;

TRUNCATE
  agents,
  areas_served,
  designations_certs,
  specializations,
  ratings,
  recommendations
  RESTART IDENTITY CASCADE;

INSERT INTO agents (
    user_name, 
    password, 
    first_name,
    last_name,
    agent_phone,
    agent_phone_type,
    agent_email,
    title,
    city,
    state,
    zip,
    office,
    bio,
    experience,
    brokerage,
    slogan,
    price_min,
    price_max
) VALUES
  (
      'SaveMiddleEarth1',
      'password123',
      'Bilbo',
      'Beggins',
      '800-666-5555',
      'cell',
      'bilbosells@gmail.com',
      'Agent',
      'The Shire',
      'Middle-earth',
      12354,
      'Gandolf Real Estate',
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus',
      50,
      'Gandolf Real Estate',
      'I will help you get rid of your precious!',
      140,000,
      350,000
  );

INSERT INTO areas_served (zip, area)
VALUES
  (
      33533,
      'Misty Mountains'
  ),
  (
      44544,
      'Emyn Beraid'
  ),
  (
      65666,
      'Mount Doom'
  ),
  (
      88588,
      'Weathertop'
  );

INSERT INTO designations_certs ()
VALUES
  (),
  (),
  (),
  (),
  (),
  (),
  (),
  ();

INSERT INTO specializations (specialization)
VALUES
  ('second breakfast'),
  ('tea'),
  ('lunch'),
  ('third breakfast');

INSERT INTO ratings ()
VALUES
  (),
  ();

INSERT INTO recommendations ()
VALUES
  (),
  ();

COMMIT;