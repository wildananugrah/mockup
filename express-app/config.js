// Using require to import dotenv instead of import
const dotenv = require('dotenv');

dotenv.config();

const appEnv =
    process.env.APP_ENV === undefined ? "development" : process.env.APP_ENV;
const appHost =
    process.env.APP_HOST == undefined ? "0.0.0.0" : process.env.APP_HOST;
const appPort =
    process.env.APP_PORT === undefined
        ? 8000
        : parseInt(process.env.APP_PORT, 10);

const dbhost =
    process.env.DB_HOST === undefined ? "localhost" : process.env.DB_HOST;
const dbDatabase =
    process.env.DB_DATABASE === undefined ? "postgres" : process.env.DB_DATABASE;
const dbPort =
    process.env.DB_PORT === undefined ? 8000 : parseInt(process.env.DB_PORT, 10);
const dbUser =
    process.env.DB_USER === undefined ? "root" : process.env.DB_USER;
const dbPass =
    process.env.DB_PASS === undefined ? "pass" : process.env.DB_PASS;
const dbPoolMin =
    process.env.DB_POOL_MIN === undefined
        ? 1
        : parseInt(process.env.DB_POOL_MIN, 10);
const dbPoolMax =
    process.env.DB_POOL_MAX === undefined
        ? 1
        : parseInt(process.env.DB_POOL_MAX, 10);
const dbIdleTimeout =
    process.env.DB_IDLE_TIMEOUT === undefined
        ? 1000
        : parseInt(process.env.DB_IDLE_TIMEOUT, 10);
const dbConnectionTimeout =
    process.env.DB_CONNECTION_TIMEOUT === undefined
        ? 1000
        : parseInt(process.env.DB_CONNECTION_TIMEOUT, 10);
const dbMaxUses =
    process.env.DB_MAX_USES === undefined
        ? 7500
        : parseInt(process.env.DB_MAX_USES, 10);

const privateKey =
    process.env.PRIVATE_KEY_FILE === undefined
        ? "./keys/key.key"
        : process.env.PRIVATE_KEY_FILE;
const certificate =
    process.env.CERTIFICATE_FILE === undefined
        ? ".keys/certificate.crt"
        : process.env.CERTIFICATE_FILE;

// Exporting using module.exports instead of export
module.exports = {
    appEnv,
    appHost,
    appPort,
    dbhost,
    dbDatabase,
    dbPort,
    dbUser,
    dbPass,
    dbPoolMin,
    dbPoolMax,
    dbIdleTimeout,
    dbConnectionTimeout,
    dbMaxUses,
    privateKey,
    certificate
};
