const Tododb = require('pg').Pool;

const todoListDb = new Tododb({
    user : "postgres",
    password: "1234",
    database: "todolisttestdb",
    host: "localhost",
    port: 5432
})

module.exports = todoListDb;