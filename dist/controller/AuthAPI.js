"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAPI = void 0;
const apollo_server_errors_1 = require("apollo-server-errors");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthAPI {
    verifyToken(token) {
        if (!token)
            throw new apollo_server_errors_1.ApolloError('missing token');
        const decode = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        return !!decode;
    }
}
exports.AuthAPI = AuthAPI;
