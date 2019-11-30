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

agentRouter
  .route('/:agent_id')
  .all(requireAuth)
  .all(checkAgentExists)
  .get((req, res) => {
    res.json(AgentService.serializeAgent(res.agent))
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