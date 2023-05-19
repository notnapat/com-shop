const { Sequelize } = require("sequelize");
const db = require("../config/Database");


const { DataTypes } = Sequelize;

const BrandModel = db.define(
    "tests",
    {
        //         username: DataTypes.STRING,
        //     email: DataTypes.STRING,
        //     phone: DataTypes.STRING,
        //     password: DataTypes.STRING
        // },{
        //     freezeTableName: true
        // });

        // brand_id: DataTypes.INTEGER,
    //     name: DataTypes.STRING,
    //     image: DataTypes.STRING,
    //     url: DataTypes.STRING,
    // },
    // {
        // tableName: 'cpu',
        // freezeTableName: true,
    // }
// );
    // cpu_id: {
    //     type: DataTypes.INTEGER,
    //     // allowNull: false,
    // },
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
    // BrandModel.associate = (models) => {
    //     BrandModel.hasMany(models.cpus, {
    //         onDelete: "cascade",
    //         onUpdate: "cascade",
    //     }); 
        
        // Posts.hasMany(models.Likes, {
        //     onDelete: "cascade",
        // }); 
    //     return  BrandModel
    // };
module.exports = BrandModel;

// export default UsersModel;

// (async () => {
//     await db.sync({force:true});
// })();
// (async () => {
//     await db.sync();
// })();
