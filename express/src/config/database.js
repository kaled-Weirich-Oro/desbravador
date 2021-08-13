import Sequelize from "sequelize";

const Connection = new Sequelize('teste', 'postgres', 'postgres', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432
});
module.exports = Connection