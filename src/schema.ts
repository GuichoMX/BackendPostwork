import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    getAllBooks: [Book],
    getBook(asin:ID!): Book,
    getAllLives: [Live],
    getLive(liveId:ID!): Live,
  }
  type Mutation {
    insertBook(asin:ID!,title:String, author:String, pages:Int): Book,
    updateBook(asin:ID!,title:String, author:String, pages:Int): Book,
    insertLive(liveId:ID!,title:String, author:String, category:String): Live,
    updateLive(liveId:ID!,title:String, author:String, category:String): Live,
    signUp(input: UserInput): User,
    signIn(email: String!, password: String!): String
  }
  type Book {
    asin: ID,
    title: String,
    author: String,
    pages: Int
  }

  type Live {
    liveId: ID,
    title: String,
    author: String,
    category: String
  }

  type User {
    id: Int
    name: String
    lastname: String
    email: String
    isAdmin: Boolean
  }

  input UserInput {
    name: String
    lastname: String
    email: String!
    password: String!
    isAdmin: Boolean
  }
`