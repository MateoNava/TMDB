const { Sequelize } = require("sequelize")


const db = new Sequelize('the_movie_db', null, null, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

module.exports = db