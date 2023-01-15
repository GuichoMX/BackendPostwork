import { ApolloError } from "apollo-server-errors";
// import { sequelize } from "../db";
import Book from "../db/model/Book";

export class BookController{
    async getBooks(){
        return await Book.findAll()
    }

    async getBook(asin: string){
        return await Book.findOne({
            where: { asin }
        })
    }

    async saveBook(asin: string, title: string, author: string, pages: number){
        return await Book.create({asin, title, author, pages})
    }

    async updateBook(asin: string, title: string, author: string, pages: number){
        const book = await Book.findOne({
            where: { asin } // es una notación corta de where: { asin: asin }
        })
        // si existe procedemos a actualizar
        if (book) {
            await Book.update({ asin, title, author, pages }, {
                where: { asin } // es una notación corta de where: { asin: asin }
            })
            // regresamos el libro reciéntemente actualizado
            return await Book.findOne({ where: { asin } })
        }
        // en caso contrario, lanzamos mensaje y código de error
        else {
            throw new ApolloError('Book not found', 'ERR003')
        }
        
    }
}