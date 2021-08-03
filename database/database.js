const Sequelize = require("sequelize")

const connection = new Sequelize('heroku_a7439d06fa6f92f', 'b6ecee749034df', '6339ba00', {
    host: 'us-cdbr-east-04.cleardb.com',
    dialect: 'mysql',
})

module.exports = connection