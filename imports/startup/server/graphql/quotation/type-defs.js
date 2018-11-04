// graphql type definition and query definition

import { gql } from 'apollo-server-express'

//const typeDefs = `
const typeDefs = gql`

  type Quotation {
    _id: ID!
    quote_no: Int
    senderId: String
    sales_person: String
    user:  User
    quotation: QuotationInstance
  }

  type QuotationInstance {
    quote_no: Int!
    quote_date: String
    price_selection: String
    notes: String
    final: Boolean
    active: Boolean
    po_no: String
    sales_person: String
    username: String
    message: String
    reason: String
    item: Item
  }

  type Item {
      recipientID: String
      ownderId: String
      url: String
      title: String
      MPN: String
      asin: String
      thumbnailImage: String
      source: String,
      price: Float
      qty: Int
      shipping: Float
      category: [String]
      condition: String
      availability: String,
      weight: Float
      height: Float
      length: Float
      width: Float
      language: String
      username: String
      chargeableWeight: Float
      final: Boolean
      requestor: String
      quote_no: Int
      recipentID: String
    }

  type Query {
        getQuotation(quote_no: Int, search: String): [Quotation]
        user: User
  }
`;

//  user: User
export default typeDefs;
