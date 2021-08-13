//import knex from 'knex';
//const HOST = "192.168.0.104";
//const HOST = "database";
const HOST = "localhost"
const PORT = 5432;
const USER = "postgres";
const PASSWORD = "";
const DATABASE = "postgres";
const CLIENT ="postgres";

const knex_ = {
//const config = {
    client: CLIENT,
    connection: {
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: DATABASE,
    },
    migrations: {
        directory: './migration'
    }
};
//const connect = new pg.Pool(config).connect();
//export default connect;
//export default knex_;
module.exports = knex_
