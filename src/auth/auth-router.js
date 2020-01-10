/*jshint esversion: 6 */
/*jshint esversion: 8 */

const express = require('express');
const AuthService = require('./auth-service');

const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter
  .post('/login', jsonBodyParser, (req, res, next) => {
    const {agent_email, password} = req.body;
    const loginUser = {agent_email, password};

    for(const [key, value] of Object.entries(loginUser))
        if(value == null)
            return res.status(400).json({
                error: `Missing '${key}' in request body`
            });

    AuthService.getAgentWithEmail(
        req.app.get('db'),
        loginUser.agent_email
    )
        .then(dbUser =>{
            if(!dbUser)
                return res.status(400).json({
                    error: `Incorrect email or password`
                });

            return AuthService.comparePasswords(loginUser.password, dbUser.password)
                .then(compareMatch =>{
                    if(!compareMatch)
                    return res.status(400).json({
                        error: `Incorrect email or password`
                    });
                    const sub = dbUser.agent_email;
                    const payload = {user_id: dbUser.id};

                    res.send({
                        authToken: AuthService.createJwt(sub, payload),
                        id: dbUser.id
                    });
                });
        })
        .catch(next);
  });

module.exports = authRouter;