"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const BookController_1 = require("./controller/BookController");
const UserController_1 = require("./controller/UserController");
const LiveController_1 = require("./controller/LiveController");
const AuthAPI_1 = require("./controller/AuthAPI");
const bookController = new BookController_1.BookController();
const liveController = new LiveController_1.LiveController();
const userController = new UserController_1.UserController();
const AuthController = new AuthAPI_1.AuthAPI();
exports.resolvers = {
    Query: {
        getAllBooks: (_, __, { token }) => {
            return AuthController.verifyToken(token) && bookController.getBooks();
        },
        getBook: (_, { asin }, { token }) => {
            return AuthController.verifyToken(token) && bookController.getBook(asin);
        },
        getAllLives: (_, __, { token }) => {
            return AuthController.verifyToken(token) && liveController.getLives();
        },
        getLive: (_, { liveId }, { token }) => {
            return AuthController.verifyToken(token) && liveController.getLive(liveId);
        }
    },
    Mutation: {
        insertBook: (_, { asin, title, author, pages }, { token }) => {
            return AuthController.verifyToken(token) && bookController.saveBook(asin, title, author, pages);
        },
        updateBook: async (_, { asin, title, author, pages }, { token }) => {
            return AuthController.verifyToken(token) && bookController.updateBook(asin, title, author, pages);
        },
        insertLive: (_, { liveId, title, author, category }, { token }) => {
            return AuthController.verifyToken(token) && liveController.saveLive(liveId, title, author, category);
        },
        updateLive: async (_, { liveId, title, author, category }, { token }) => {
            return AuthController.verifyToken(token) && liveController.updateLive(liveId, title, author, category);
        },
        signUp: async (_, { input: user }) => {
            return userController.saveUser(user);
        },
        signIn: async (_, { email, password }) => {
            return userController.getUserToken(email, password);
        }
    }
};
