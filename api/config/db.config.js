
const host = process.env.MA_DB_HOST;
const user = process.env.MA_DB_USER;
const pwd = process.env.MA_DB_PWD;
const db = process.env.MA_DB_NAME;

module.exports = {
    HOST: host,
    USER: user,
    PASSWORD: pwd,
    DB: db,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 1000 
    }
};