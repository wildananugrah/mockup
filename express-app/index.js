const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

const { pool } = require('./database');
const { HealthCheck } = require('user-management-db/HealthCheck');
const { UserService } = require('user-management-db/UserService');
const { UserRoleTrxService } = require('user-management-db/UserRoleTrxService');
const { User, AppError } = require('user-management/user');
const { JWTService } = require('jwt-service');
const { privateKey, certificate } = require('./config');

app.get('/_/healthcheck', async (req, res) => {
    try {
        const db = await new HealthCheck(await pool.connect()).test();
        return res.status(200).send({ app: true, db });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ app: false, db: false });
    }
})

app.post('/api/users/register', async (req, res) => {
    try {
        const userService = new UserService(await pool.connect());
        const jwtService = new JWTService({
            privateKey: privateKey,
            certificate: certificate,
        });
        const userRoleTrxService = new UserRoleTrxService(
            await pool.connect()
        );
        const user = new User(userService, userRoleTrxService, jwtService);
        const { username, password } = req.body;
        return res.status(200).send(await user.register(username, password));
    } catch (error) {
        if (error instanceof AppError) {
            return res
                .status(400)
                .send({ code: error.code, message: error.message });
        }
        return res.status(500).send({ code: 500, message: error.message });
    }
});

app.post('/api/users/login', async (req, res) => {
    try {
        const userService = new UserService(await pool.connect());
        const jwtService = new JWTService({
            privateKey: privateKey,
            certificate: certificate,
        });
        const userRoleTrxService = new UserRoleTrxService(
            await pool.connect()
        );
        const user = new User(userService, userRoleTrxService, jwtService);
        const { username, password } = req.body;
        return res.status(200).send(await user.login(username, password));
    } catch (error) {
        if (error instanceof AppError) {
            return res
                .status(400)
                .send({ code: error.code, message: error.message });
        }
        return res.status(500).send({ code: 500, message: error.message });
    }
});

app.get('/api/users/info', async (req, res) => {
    try {
        const jwtService = new JWTService({
            privateKey: privateKey,
            certificate: certificate,
        });
        const token = req.headers.authorization.split(" ")[1];
        const encodedToken = await jwtService.validate(token);
        delete encodedToken.iat;
        delete encodedToken.exp;
        return res.status(200).send(encodedToken);
    } catch (error) {
        if (error instanceof AppError) {
            return res
                .status(400)
                .send({ code: error.code, message: error.message });
        }
        return res.status(500).send({ code: 500, message: error.message });
    }
});

app.put('/api/token', async (req, res) => {
    try {
        const jwtService = new JWTService({
            privateKey: privateKey,
            certificate: certificate,
        });
        const { token, expired } = req.body;
        return res.status(200).send(await jwtService.refresh(token, expired));
    } catch (error) {
        if (error instanceof AppError) {
            return res
                .status(400)
                .send({ code: error.code, message: error.message });
        }
        return res.status(500).send({ code: 500, message: error.message });
    }
});

app.listen(port, async () => {
    const db = await new HealthCheck(await pool.connect()).test();
    console.log(`Example app listening on port ${port}`)
})
