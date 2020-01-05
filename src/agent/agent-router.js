const path = require('path');
const express = require('express');
const xss = require('xss')
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
    user_name: xss(agent.user_name),
    password: xss(agent.password),
  })

agentRouter
  .route('/')
  .get((req, res, next) => {
    AgentService.getAllAgentInfo(req.app.get('db'))
      .then(agents => {
        res.json(agents.map(serializeAgent))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) =>{
    const {first_name, last_name, user_name, password, agent_email, agent_phone} = req.body;
    const newAgent = {first_name, last_name, user_name, password, agent_email, agent_phone};

    for(const [key, value] of Object.entries(newAgent)){
      if(value == null){
          return res.status(400).json({
              error: {message: `Missing '${key}' in request body`}
          })
      }
    }

    newAgent.agent_phone_type = null;
    newAgent.city = null;
    newAgent.state = null;
    newAgent.zip = null;
    newAgent.brokerage = null;
    newAgent.title = null;
    newAgent.office = null;
    newAgent.bio = null;
    newAgent.experience = null;
    newAgent.slogan = null;
    newAgent.date_created = new Date();
    newAgent.date_modified = new Date();

    const knexInstance = req.app.get('db')

    AgentService.insertAgent(knexInstance, newAgent)
      .then(agent =>{
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${agent.id}`))
          .json(serializeAgent(agent))
      })
      .catch(next)
  })

agentRouter
  .route('/:agent_id')
  .all(checkAgentExists)
  .get((req, res) => {
    res.json(serializeAgent(res.agent))
  })

/* async/await syntax for promises */
async function checkAgentExists(req, res, next) {
  try {
    const agent = await AgentService.getById(
      req.app.get('db'),
      req.params.agent_id
    )

    if (!agent)
      return res.status(404).json({
        error: `Agent doesn't exist`
      })

    res.agent = agent
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = agentRouter