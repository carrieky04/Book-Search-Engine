const typeDefs = `#graphql
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Books]!
    }
    type Book {
        bookId: ID
        authors: [authors]!
        description: String
        title: String
        image: String
        link: String
    }
    input bookData {
        id: Int!
        
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: [User]
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        removeBook(bookId: String!): User
    }
`;
