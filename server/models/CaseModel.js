const { Sequelize } = require("sequelize");
const db = require("../config/Database");

const { DataTypes } = Sequelize;

const CaseModel = db.define("cases", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
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

module.exports = CaseModel;

// (async () => {
//     await db.sync({ force: false });
// })();
