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
  insertAgent(db, newAgent){
    return db
      .insert(newAgent)
      .into('agents')
      .returning('*')
      .then(rows =>{
        return rows[0]
      })
  },
  getById(db, id) {
    return AgentService.getAllAgentInfo(db)
      .where('agents.id', id)
      .first()
  },
  validatePassword(password) {
    if (password.length < 8) {
      return 'Password must be longer than 8 characters'
    }
    if (password.length > 72) {
      return 'Password must be less than 72 characters'
    }
    if(password.startsWith(' ') || password.endsWith(' ')){
      return 'Password must not start or end with empty spaces'
    }
    if(!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)){
        return 'Password must contain 1 upper case, lower case, number and special character'
    }
  },
  hashPassword(password){
    return bcrypt.hash(password, 12)
  },
  hasUserWithEmail(db, agent_email){
    return db('users')
        .where({agent_email})
        .first()
        .then(user => !!user)
  },
}

module.exports = AgentService