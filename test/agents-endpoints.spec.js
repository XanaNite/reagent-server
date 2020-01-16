const knex = require('knex');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe.only('Agents Endpoints', function(){
    let db;

    const testAgents = helpers.makeAgentsArray();
    const testUsers = helpers.makeUsersArray();
    const testUser = testUsers[0];

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

    describe(`GET /api/agents`, () =>{
        context(`Given no agents`, () =>{
            it(`responds with 200 and an empty list`, () =>{
                return supertest(app)
                    .get('/api/agents')
                    .expect(200, [])
            });
        });

        context(`Given there are agents`, () =>{
            beforeEach(`insert agents`, () =>
                helpers.seedAgents(db, testAgents)
            )

            it(`responds with 200 and all agents`, () =>{
                return supertest(app)
                    .get(`/api/agents`)
                    .expect(200, testAgents)
            });
        });
    });

    describe(`GET /api/agents/:agent_id`, () =>{
        context(`Given no agent`, () =>{
            it(`responds with 404`, () =>{
                const agentId = 123;

                return supertest(app)
                    .get(`/api/agents/${agentId}`)
                    .expect(404, {error: `Agent doesn't exist`})
            });
        });

        context(`Given there is an agent`, () =>{
            beforeEach(`insert agents`, () =>
                helpers.seedAgents(db, testAgents)
            );

            it(`responds with 200 and agent info`, () =>{
                const agentId = 2;
                const expectedAgent = testAgents[agentId - 1];

                return supertest(app)
                    .get(`/api/agents/${agentId}`)
                    .expect(200, expectedAgent)
            });
        });
    });

    describe(`POST /api/agents used for user registration`, () =>{
        context(`User Validation`, () => {
            beforeEach('insert users', () =>
                helpers.seedUsers(
                db,
                testUsers,
                )
            )

            const requiredFields = ['first_name', 'last_name', 'password', 'agent_email', 'agent_phone'];

            requiredFields.forEach(field =>{
                const registerAttemptBody = {
                    first_name: 'test first_name', 
                    last_name: 'test last_name', 
                    password: 'test password', 
                    agent_email: 'test agent_email', 
                    agent_phone: 'test agent_phone',
                }

                it(`responds with 400 required error when '${field}' is missing`, () =>{
                    delete registerAttemptBody[field];

                    return supertest(app)
                        .post(`/api/agents`)
                        .send(registerAttemptBody)
                        .expect(400, {
                            error: {message: `Missing '${field}' in request body`}
                        })
                });
            });

            it(`Responds 400 password must be longer than 8 characters when empty password`, () =>{
                const userShortPassword = {
                    first_name: 'test first_name', 
                    last_name: 'test last_name', 
                    password: '1234567', 
                    agent_email: 'test agent_email', 
                    agent_phone: 'test agent_phone',
                };
        
                return supertest(app)
                .post(`/api/agents`)
                  .send(userShortPassword)
                  .expect(400, {
                    error: 'Password must be longer than 8 characters'
                  })
            });

            it(`Responds 400 password must be shorter than 72 characters when empty password`, () =>{
                const userLongPassword = {
                    first_name: 'test first_name', 
                    last_name: 'test last_name', 
                    password: '*'.repeat(73), 
                    agent_email: 'test agent_email', 
                    agent_phone: 'test agent_phone',
                };
        
                return supertest(app)
                .post(`/api/agents`)
                  .send(userLongPassword)
                  .expect(400, {
                    error: 'Password must be less than 72 characters'
                  })
            });

            it(`Responds 400 when password starts with spaces`, () =>{
                const userStartsWithSpacesPassword = {
                    first_name: 'test first_name', 
                    last_name: 'test last_name', 
                    password: ' 1Aa!2Bb@', 
                    agent_email: 'test agent_email', 
                    agent_phone: 'test agent_phone',
                };
        
                return supertest(app)
                .post(`/api/agents`)
                  .send(userStartsWithSpacesPassword)
                  .expect(400, {
                    error: 'Password must not start or end with empty spaces'
                  })
            });

            it(`Responds 400 when password ends with spaces`, () =>{
                const userEndsWithSpacesPassword = {
                    first_name: 'test first_name', 
                    last_name: 'test last_name', 
                    password: '1Aa!2Bb@ ', 
                    agent_email: 'test agent_email', 
                    agent_phone: 'test agent_phone',
                };
        
                return supertest(app)
                .post(`/api/agents`)
                  .send(userEndsWithSpacesPassword)
                  .expect(400, {
                    error: 'Password must not start or end with empty spaces'
                  })
            });
        
            it(`Responds 400 when password isn't complex enough`, () =>{
            const userNotComplexPassword = {
                first_name: 'test first_name', 
                last_name: 'test last_name', 
                password: '12345678', 
                agent_email: 'test agent_email', 
                agent_phone: 'test agent_phone',
            };
    
            return supertest(app)
                .post(`/api/agents`)
                    .send(userNotComplexPassword)
                    .expect(400, {
                        error: 'Password must contain 1 upper case, lower case, number and special character'
                    })
            });
    
            it(`Responds 400 when user already exists`, () =>{
            const alreadyUser = {
                first_name: 'test first_name', 
                last_name: 'test last_name', 
                password: '1Aa!2Bb@', 
                agent_email: testUser.agent_email, 
                agent_phone: 'test agent_phone',
            };
    
            return supertest(app)
                .post(`/api/agents`)
                    .send(alreadyUser)
                    .expect(400, {
                        error: `Email already taken`
                    })
            });
        });

        context(`Happy path`, () =>{
            it(`responds 201, serialized user, storing bcryped password`, () => {
                const newUser = {
                    first_name: 'test first_name', 
                    last_name: 'test last_name', 
                    password: 'test password', 
                    agent_email: 'test agent_email', 
                    agent_phone: 'test agent_phone',
                };

                return supertest(app)
                    .post(`/api/agents`)
                    .send(newUser)
                    .expect(res =>{
                        expect(res.body).to.have.property('id')
                        expect(res.body.first_name).to.eql(newUser.first_name)
                        expect(res.body.last_name).to.eql(newUser.last_name)
                        expect(res.body.agent_email).to.eql(newUser.agent_email)
                        expect(res.body.agent_phone).to.eql(newUser.agent_phone)
                        expect(res.body).to.not.have.property(newUser.password)
                        expect(res.headers.location).to.eql(`/api/users/${res.body.id}`)

                        const expectedDate = new Date().toLocaleString('en', {timeZone: 'UTC'})
                        const actualDate = new Date(res.body.date_created).toLocaleString()
                        const expectedModifiedDate = new Date().toLocaleString('en', {timeZone: 'UTC'})
                        const actualModifiedDate = new Date(res.body.date_modified).toLocaleString()

                        expect(expectedDate).to.eql(actualDate)
                        expect(expectedModifiedDate).to.eql(actualModifiedDate)
                    })
                    .expect(res =>
                        db
                            .from('agents')
                            .select('*')
                            .where({id: res.body.id})
                            .first()
                            .then(row =>{
                                expect(row.first_name).to.eql(newUser.first_name)
                                expect(row.last_name).to.eql(newUser.last_name)
                                expect(row.agent_email).to.eql(newUser.agent_email)
                                expect(row.agent_phone).to.eql(newUser.agent_phone)
                                expect(row.agent_phone_type).to.eql(null)
                                expect(row.city).to.eql(null)
                                expect(row.state).to.eql(null)
                                expect(row.zip).to.eql(null)
                                expect(row.brokerage).to.eql(null)
                                expect(row.title).to.eql(null)
                                expect(row.office).to.eql(null)
                                expect(row.bio).to.eql(null)
                                expect(row.experience).to.eql(null)
                                expect(row.slogan).to.eql(null)

                                const expectedDate = new Date().toLocaleString('en', {timeZone: 'UTC'})
                                const actualDate = new Date(res.body.date_created).toLocaleString()
                                const expectedModifiedDate = new Date().toLocaleString('en', {timeZone: 'UTC'})
                                const actualModifiedDate = new Date(res.body.date_modified).toLocaleString()

                                expect(expectedDate).to.eql(actualDate)
                                expect(expectedModifiedDate).to.eql(actualModifiedDate)

                                return bcrypt.compare(newUser.password, row.password)
                            })
                            .then(compareMatch =>{
                                expect(compareMatch).to.be.true
                            })
                    )
            });
        });
    });

    describe(`PATCH /api/agents`, () =>{})
});