process.env.TZ = 'UTC';
//Timezone set to UTC doesnt work on Windows
process.env.NODE_ENV = 'test';

require('dotenv').config();
const { expect } = require('chai');
const supertest = require('supertest');

process.env.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL
    || "postgresql://postgres:G0d3sdeveloper@localhost/reagent_agent_test"

global.expect = expect;
global.supertest = supertest;