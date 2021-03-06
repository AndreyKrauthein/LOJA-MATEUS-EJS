const Sequelize = require("sequelize")
const connection = require("../database/database")

const User = connection.define("user", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }, 

    email: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false
    },


})

User.sync({force: false}).then(() => {})
module.exports = User