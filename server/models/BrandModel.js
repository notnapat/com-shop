const { Sequelize } = require("sequelize");
const db = require("../config/Database");

const { DataTypes } = Sequelize;

const BrandModel = db.define("brands", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = BrandModel;

(async () => {
    await db.sync();
})();
