import { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";
import {MongoClient, ObjectId} from 'mongodb'

import express from 'express';
import  bodyParser from 'body-parser';
//import  * as mongoose   from 'mongoose';

var mongoose = require('mongoose');

//import {ApolloServer,graphqlExpress, graphiqlExpress} from 'apollo-server-express' // same as 'graphql-server-express'
import { ApolloServer, gql  } from 'apollo-server-express';

import typeDefs from './graphql/merge-schemas';
import resolvers from './graphql/merge-schemas';
import schema from './graphql/exec-schema';

import { User, Quotation } from './models';
//import User from '../../schema/model';



console.log("imports/startup/server/index.js hi 2:01")


mongoose.connect("mongodb://webadmin:Igiveup2@ds149412.mlab.com:49412/heroku_lrtnbx3s")
//const Cat = mongoose.model('Cat', { name: String });

if (!User) console.log("User is null!")
if (!Quotation) console.log("Quotation is null!")

const port = 4000;
// const server = new ApolloServer({ typeDefs, resolvers,context: ({ req }) => ({
//     User,
//     Quotation
//   }) });
//console.log('schema:',schema)
  const server = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    User,
    Quotation,
  })
});
const app = express();
//server.applyMiddleware({ app });
server.applyMiddleware({ app, path: '/graphql' });

//app.set('port', (PORT || 3001));
// bind express with graphql


//------------------------------------------------------------------------------
// MIDDLEWARES
//------------------------------------------------------------------------------
// Apply middleware to parse incoming body requests into JSON format.
// app.use(helmet());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// // Enable the app to receive requests from the React app when running locally.
// if (isNotProduction) {
//   app.use('*', cors({ origin: 'http://localhost:3000' }));
// }
//app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: { User, Quotation } }));


//app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

//app.listen(port);
app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);
