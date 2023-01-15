import { BookController } from "./controller/BookController"
import { UserController } from "./controller/UserController"
import { LiveController } from "./controller/LiveController"
import { verifyToken } from "./auth"
import { compare, hash } from 'bcrypt'
import { ApolloError } from "apollo-server-errors"
import { AuthAPI } from "./controller/AuthAPI"
import { Token } from "graphql"

const bookController = new BookController()
const liveController = new LiveController()
const userController = new UserController()
const AuthController = new AuthAPI()


export const resolvers = {
    Query: {
        getAllBooks: (_, __, { token }) => {
            return AuthController.verifyToken(token) && bookController.getBooks()
        },
        getBook: (_, { asin }, { token }) => {
            return AuthController.verifyToken(token) && bookController.getBook(asin)
        },
        getAllLives: (_, __, { token }) => {
            return AuthController.verifyToken(token) && liveController.getLives()
        },
        getLive: (_, { liveId }, { token }) => {
            return AuthController.verifyToken(token) && liveController.getLive(liveId)
        }
    },
    Mutation: {
        insertBook: (_, { asin, title, author, pages}, {token}) => {
            return AuthController.verifyToken(token) && bookController.saveBook(asin, title, author, pages)
        },
        updateBook: async (_, { asin, title, author, pages }, {token}) => {
            return AuthController.verifyToken(token) && bookController.updateBook(asin, title, author, pages)
        },
        insertLive: (_, { liveId, title, author, category}, {token}) => {
            return AuthController.verifyToken(token) && liveController.saveLive(liveId, title, author, category)
        },
        updateLive: async (_, { liveId, title, author, category }, {token}) => {
            return AuthController.verifyToken(token) && liveController.updateLive(liveId, title, author, category)
        },
        signUp: async (_, { input: user }) => {
            return userController.saveUser(user)
        },
        signIn: async (_, { email, password }) => {
            return userController.getUserToken(email, password)
        }
    }
} 