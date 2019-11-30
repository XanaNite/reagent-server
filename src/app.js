require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {NODE_ENV} = require('./config');
//const uuid = require('uuid/v4');

//const validateBearerToken = require('./validate-bearer-token');
const agentRouter = require('./agent/agent-router');
const errorHandler = require('./middleware/error-handler');

const app = express();

const morganOption = ((NODE_ENV === 'production')
    ? 'tiny'
    : 'common',
    {
        skip: () => NODE_ENV === 'test'
    })

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

//app.use(validateBearerToken)

app.use('/api/agents', agentRouter);

app.use(errorHandler)

module.exports = app;