const config = {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '1234',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3306,
    dialect: 'mysql'
}

module.exports = config