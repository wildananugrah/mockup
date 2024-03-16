"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor(client) {
        this.tblName = "tbl_mst_user";
        this.deleteAllRecordsQuery = `DELETE FROM ${this.tblName}`;
        this.selectByUsernameAndPassword = `SELECT * FROM ${this.tblName} WHERE username=$1 and password=$2`; // TODO: it supposed to be included user attributes.
        this.insertUser = `INSERT INTO ${this.tblName} (username, password) VALUES ($1, $2) RETURNING *`;
        this.client = client;
    }
    truncate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.query(this.deleteAllRecordsQuery, []);
            }
            catch (error) {
                console.error(error);
                if (error instanceof Error)
                    throw new Error(`Error in creating todo: ${error.message}`);
            }
            finally {
                this.client.release();
            }
        });
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbResult = yield this.client.query(this.insertUser, [
                    user.username,
                    user.password,
                ]);
                return {
                    id: dbResult.rows[0].id,
                    username: dbResult.rows[0].username,
                    password: dbResult.rows[0].password,
                };
            }
            catch (error) {
                console.error(error);
                if (error instanceof Error)
                    throw new Error(`Error in creating todo: ${error.message}`);
            }
            finally {
                this.client.release();
            }
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbResult = yield this.client.query(this.selectByUsernameAndPassword, [user.username, user.password]);
                return {
                    id: dbResult.rows[0].id,
                    username: dbResult.rows[0].username,
                    password: dbResult.rows[0].password,
                };
            }
            catch (error) {
                console.error(error);
                if (error instanceof Error)
                    throw new Error(`Error in creating todo: ${error.message}`);
            }
            finally {
                this.client.release();
            }
        });
    }
}
exports.UserService = UserService;
