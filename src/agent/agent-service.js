const AgentService = {
  getAllAgentInfo(db) {
    return db
      .from('agents')
      .select('*')
/*      .leftJoin(
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
      .groupBy('agt.id')*/
  },

  getById(db, id) {
    return AgentService.getAllAgentInfo(db)
      .where('agt.id', id)
      .first()
  },
}

module.exports = AgentService