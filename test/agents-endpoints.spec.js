const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe.only('Agents Endpoints', function(){
    let db;

    const testAgents = helpers.makeAgentsArray();

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
                
            })
        });
    });
});