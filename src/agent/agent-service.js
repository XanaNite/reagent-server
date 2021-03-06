const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
const bcrypt = require('bcryptjs');

const AgentService = {
  getAllAgentInfo(db) {
    return db
      .from('agents')
      .select('*');
  },
  insertAgent(db, newAgent){
    return db
      .insert(newAgent)
      .into('agents')
      .returning('*')
      .then(rows =>{
        return rows[0];
      });
  },
  getById(db, id) {
    return AgentService.getAllAgentInfo(db)
      .where('agents.id', id)
      .first();
  },
  validatePassword(password) {
    if (password.length < 8) {
      return 'Password must be longer than 8 characters';
    }
    if (password.length > 72) {
      return 'Password must be less than 72 characters';
    }
    if(password.startsWith(' ') || password.endsWith(' ')){
      return 'Password must not start or end with empty spaces';
    }
    if(!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)){
        return 'Password must contain 1 upper case, lower case, number and special character';
    }
  },
  hashPassword(password){
    return bcrypt.hash(password, 12);
  },
  hasUserWithEmail(db, agent_email){
    return db('agents')
        .where({agent_email})
        .first()
        .then(user => !!user);
  },
  updateAgent(db, id, newAgentFields){
    return db('agents')
      .where({id})
      .update(newAgentFields);
  },
};

module.exports = AgentService;