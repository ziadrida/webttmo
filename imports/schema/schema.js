import { gql } from 'apollo-server-express'

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
    real_name: String
    email: String
    role: String
    location: String
    order_status_subscription: Boolean
    price_drop_subscription: Boolean
  #  date_created: DateTime
}



type Query {
  hi: String
  allCats: [Cat]
  getQuotation(quote_no: Int!): [Quotation]
  getUser(username: String!): [User]
  user: User
}

type Mutation {
  createCat(name: String!): Cat!
  createQuotation(quote_no: Int!): Quotation!
}
`;

export default typeDefs;
