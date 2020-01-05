module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_TOKEN: process.env.API_TOKEN || '09e7d47e-2f50-11ea-978f-2e728ce88125', //add API token
    DB_URL: process.env.DB_URL || `postgresql://postgres:G0d3sdeveloper@localhost/reagent_agent`, //add database
}