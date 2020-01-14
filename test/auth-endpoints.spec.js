const knex = require('knex');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Auth Endpoints', function() {
  let db

  const { testAgents } = helpers.makeAgentsArray()
  const testAgent = testAgents[0]

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`POST /auth/login`, () => {
    beforeEach('insert agents', () =>
      helpers.seedAgents(
        db,
        testAgents,
      )
    )

    const requiredFields = ['email', 'password']

    requiredFields.forEach(field => {
      const loginAttemptBody = {
        email: testAgent.email,
        password: testAgent.password,
      }

      it(`responds with 400 required error when '${field}' is missing`, () => {
        delete loginAttemptBody[field]

        return supertest(app)
          .post('/auth/login')
          .send(loginAttemptBody)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          })
      })
    })

    it(`responds 400 'invalid email or password' when bad email`, () => {
      const userInvalidUser = { email: 'user-not', password: 'existy' }
      return supertest(app)
        .post('/auth/login')
        .send(userInvalidUser)
        .expect(400, { error: `Incorrect email or password` })
    })

    it(`responds 400 'invalid email or password' when bad password`, () => {
      const userInvalidPass = { email: testAgent.email, password: 'incorrect' }
      return supertest(app)
        .post('/auth/login')
        .send(userInvalidPass)
        .expect(400, { error: `Incorrect email or password` })
    })

    it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
      const userValidCreds = {
        email: testAgent.email,
        password: testAgent.password,
      }
      const expectedToken = jwt.sign(
        { user_id: testAgent.id },
        process.env.JWT_SECRET,
        {
          subject: testAgent.email,
          algorithm: 'HS256',
        }
      )
      return supertest(app)
        .post('/auth/login')
        .send(userValidCreds)
        .expect(200, {
          authToken: expectedToken,
          id: testAgent.id
        })
    })
  })
})