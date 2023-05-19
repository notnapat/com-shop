const Sequelize = require("sequelize");
const mysql2 = require("mysql2")

const db = new Sequelize("com-shop", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    timezone: "+07:00",
    dialectModule: mysql2
});

module.exports = db;
 