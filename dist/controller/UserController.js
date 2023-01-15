"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const apollo_server_errors_1 = require("apollo-server-errors");
const User_1 = __importDefault(require("../db/model/User"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const logger_1 = require("../logger");
class UserController {
    constructor() {
        this.SALT_ROUNDS = 10;
    }
    async saveUser(user) {
        user.password = await (0, bcrypt_1.hash)(user.password, this.SALT_ROUNDS);
        return await User_1.default.create({ ...user });
    }
    async getUserToken(email, password) {
        const user = await User_1.default.findOne({ where: { email } });
        if (user && await (0, bcrypt_1.compare)(password, user.password)) {
            const tokenData = {
                fullName: user.name + ' ' + user.lastname,
                email,
                isAdmin: user.isAdmin
            };
            logger_1.logger.info(`signin: Usuario ${user.id} accedió al sistema`);
            return (0, jsonwebtoken_1.sign)(tokenData, process.env.JWT_SECRET, { expiresIn: 500 });
        }
        else {
            logger_1.logger.error(`signIn: Credenciales invalidas para ${email}`);
            throw new apollo_server_errors_1.AuthenticationError('Invalid credentials');
        }
    }
}
exports.UserController = UserController;
