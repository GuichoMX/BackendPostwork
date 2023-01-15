"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const apollo_server_errors_1 = require("apollo-server-errors");
// import { sequelize } from "../db";
const Book_1 = __importDefault(require("../db/model/Book"));
class BookController {
    async getBooks() {
        return await Book_1.default.findAll();
    }
    async getBook(asin) {
        return await Book_1.default.findOne({
            where: { asin }
        });
    }
    async saveBook(asin, title, author, pages) {
        return await Book_1.default.create({ asin, title, author, pages });
    }
    async updateBook(asin, title, author, pages) {
        const book = await Book_1.default.findOne({
            where: { asin } // es una notación corta de where: { asin: asin }
        });
        // si existe procedemos a actualizar
        if (book) {
            await Book_1.default.update({ asin, title, author, pages }, {
                where: { asin } // es una notación corta de where: { asin: asin }
            });
            // regresamos el libro reciéntemente actualizado
            return await Book_1.default.findOne({ where: { asin } });
        }
        // en caso contrario, lanzamos mensaje y código de error
        else {
            throw new apollo_server_errors_1.ApolloError('Book not found', 'ERR003');
        }
    }
}
exports.BookController = BookController;
