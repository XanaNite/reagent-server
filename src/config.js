module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_TOKEN: process.env.API_TOKEN || '', //add API token
    DB_URL: process.env.DB_URL || `postgresql://postgres:G0d3sdeveloper@localhost/reagent_agent`, //add database
}