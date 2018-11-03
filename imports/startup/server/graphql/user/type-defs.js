//  graphql type definition and query definition




import { gql } from 'apollo-server-express'

//const typeDefs = `
const typeDefs = gql`
type User {
    _id: ID!
    name: String
    address:  String
    locale: String
    city: String
    vip: Boolean
    phone_no: String
    tax_exempt: Boolean
    company: String
    user_title: String
    email: String
    role: String
    location: String
    order_status_subscription: Boolean
    price_drop_subscription: Boolean
  
}

type Query {
    user: User
    getUser(username: String!): [User]
}

type Mutation {
  sendPassCode(email: String!): Response!
}
`;

export default typeDefs;
