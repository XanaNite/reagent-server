const express = require('express')
const AgentService = require('./agent-service')
const {requireAuth} = require('../middleware/jwt-auth')

const agentRouter = express.Router()

agentRouter
  .route('/')
  .get((req, res, next) => {
    AgentService.getAllAgentInfo(req.app.get('db'))
      .then(agent => {
        res.json(agent.map(AgentService.serializeArticle))
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