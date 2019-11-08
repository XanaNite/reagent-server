const xss = require('xss')

const AgentService = {
  getAllAgentInfo(db) {
    return db
      .from('agents AS agt')
      .select(
        'agt.id',
        'agt.first_name',
        'agt.last_name',
        'agt.agent_phone',
        'agt.agent_phone_type',
        'agt.agent_email',
        'agt.title',
        'agt.city',
        'agt.state',
        'agt.zip',
        'agt.office',
        'agt.bio',
        'agt.experience',
        'agt.brokerage',
        'agt.slogan',
        'agt.price_min',
        'agt.price_max',
        'agt.date_created',
        'agt.date_modified',
        'agt.user_name',
        'agt.password',
      )
      .leftJoin(
        'agent_areas_served AS areas',
        'agt.id',
        'areas.agent_id',
      )
      .leftJoin(
        'agent_designations_certs AS certs',
        'agt.id',
        'certs.agent_id',
      )
      .leftJoin(
        'agent_specialization AS spec',
        'agt.id',
        'spec.agent_id',
      )
      .leftJoin(
        'ratings AS rtng',
        'agt.id',
        'rtng.agent_id',
      )
      .leftJoin(
        'recommendations AS recom',
        'agt.id',
        'recom.agent_id',
      )
      .groupBy('agt.id')
  },

  getById(db, id) {
    return AgentService.getAllAgentInfo(db)
      .where('agt.id', id)
      .first()
  },

  serializeAgent(agent) {
    return {
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
    }
  },
}

module.exports = AgentService