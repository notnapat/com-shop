const { Sequelize } = require("sequelize");
const db = require("../config/Database");

const { DataTypes } = Sequelize;

const CpuAmdModel = db.define("cpu_amds", {
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

module.exports = CpuAmdModel;

// (async () => {
//     await db.sync({ force: false });
// })();
