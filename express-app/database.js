const { Pool } = require("pg");
const { dbhost, dbDatabase, dbPort, dbUser, dbPass, dbPoolMin, dbPoolMax, dbIdleTimeout, dbConnectionTimeout, dbMaxUses } = require("./config");

var pool = new Pool({
    host: dbhost,
    database: dbDatabase,
    port: dbPort,
    user: dbUser,
    password: dbPass,
    ssl: false,
    min: dbPoolMin,
    max: dbPoolMax,
    idleTimeoutMillis: dbIdleTimeout,
    connectionTimeoutMillis: dbConnectionTimeout,
    maxUses: dbMaxUses,
});

module.exports = {
    pool
}