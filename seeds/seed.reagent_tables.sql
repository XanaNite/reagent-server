BEGIN;

TRUNCATE
  agents,
  areas_served,
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
      '12354',
      'Gandolf Real Estate',
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus',
      50,
      'Gandolf Real Estate',
      'I will help you get rid of your precious!',
      140000,
      350000
  );

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