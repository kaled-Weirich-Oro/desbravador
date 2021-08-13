import Sequelize from 'sequelize';
import db from '../config/database';

const teste = db.define('teste', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    descricao: {
        type: Sequelize.STRING,
    }
});
module.exports = teste;