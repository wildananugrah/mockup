"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserServiceMock_1 = require("test/UserServiceMock");
const user_1 = require("user");
const user = new user_1.User(new UserServiceMock_1.UserServiceMock());
user.login("wildananugrah", "p@ssw0rd");
