/*jshint esversion: 6 */
/*jshint esversion: 8 */

const path = require('path');
const express = require('express');
const xss = require('xss');
const AgentService = require('./agent-service');
const {requireAuth} = require('../middleware/jwt-auth');

const agentRouter = express.Router();
const jsonParser = express.json();

const serializeAgent = agent => ({
    id: agent.id,
    first_name: xss(agent.first_name),
    last_name: xss(agent.last_name),
    title: xss(agent.title),
    agent_phone: xss(agent.agent_phone),
    agent_phone_type: xss(agent.agent_phone_type),
    agent_email: xss(agent.agent_email),
    city: xss(agent.city),
    state: xss(agent.state),
    zip: xss(agent.zip),
    office: xss(agent.office),
    bio: xss(agent.bio),
    experience: xss(agent.experience),
    brokerage: xss(agent.brokerage),
    slogan: xss(agent.slogan),
    price_min: agent.price_min,
    price_max: agent.price_max,
    date_created: new Date(agent.date_created),
    date_modified: new Date(agent.date_modified),
    password: xss(agent.password),
  });

agentRouter
  .route('/')
  .get((req, res, next) => {
    AgentService.getAllAgentInfo(req.app.get('db'))
      .then(agents => {
        res.json(agents.map(serializeAgent));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) =>{
    const {first_name, last_name, password, agent_email, agent_phone} = req.body;

    for(const field of ['first_name', 'last_name', 'password', 'agent_email', 'agent_phone']){
      if(!req.body[field]){
          return res.status(400).json({
              error: {message: `Missing '${field}' in request body`}
          });
      }
    }

    const badPassword = AgentService.validatePassword(password);

    if(badPassword)
      return res.status(400).json({
        error: badPassword
      });

    AgentService.hasUserWithEmail(
      req.app.get('db'),
      agent_email
    )
    .then(hasEmail =>{
      if(hasEmail)
        return res.status(400).json({
          error: `Email already taken`
        });

      return AgentService.hashPassword(password)
        .then(hashedPassword => {
          const newAgent = {
            first_name,
            last_name,
            agent_phone,
            agent_email,
            password: hashedPassword,
            agent_phone_type: null,
            city: null,
            state: null,
            zip: null,
            brokerage: null,
            title: null,
            office: null,
            bio: null,
            experience: null,
            slogan: null,
            date_created: new Date(),
            date_modified: new Date()
          };

          const knexInstance = req.app.get('db');

          return AgentService.insertAgent(knexInstance, newAgent)
            .then(agent =>{
              res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${agent.id}`))
                .json(serializeAgent(agent));
            });
        });
    })
      .catch(next);
  });

agentRouter
  .route('/:agent_id')
  .all(checkAgentExists)
  .get((req, res) => {
    res.json(serializeAgent(res.agent));
  })
  .patch(jsonParser, (req, res, next) =>{
    const {first_name, last_name, title, agent_phone, agent_phone_type, city, state, zip, office, bio, experience, brokerage, slogan} = req.body;
    const agentToUpdate = {first_name, last_name, title, agent_phone, agent_phone_type, city, state, zip, office, bio, experience, brokerage, slogan};


  });

/* async/await syntax for promises */
async function checkAgentExists(req, res, next) {
  try {
    const agent = await AgentService.getById(
      req.app.get('db'),
      req.params.agent_id
    );

    if (!agent)
      return res.status(404).json({
        error: `Agent doesn't exist`
      });

    res.agent = agent;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = agentRouter;