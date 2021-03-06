import { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";
import {MongoClient, ObjectId} from 'mongodb'
//import {ApolloServer,graphqlExpress, graphiqlExpress} from 'apollo-server-express' // same as 'graphql-server-express'
import { ApolloServer, gql  } from 'apollo-server-express';


import { WebApp } from 'meteor/webapp'
import { getUser } from 'meteor/apollo'

import cors from 'cors';
import express from 'express';
import  bodyParser from 'body-parser';


//import  * as mongoose   from 'mongoose';

var mongoose = require('mongoose');


// import typeDefs from './graphql/merge-schemas';
// import resolvers from './graphql/merge-schemas';
import schema from './graphql/exec-schema';

import { User, Quotation } from './models';
//import User from '../../schema/model';

// Log env vars
const {
  MONGODB_URI,
  ROOT_URL,
  NODE_ENV,
  PORT,
  MONGO_URL,
  JWT_PRIVATE_KEY,
} = process.env;

const isNotProduction = NODE_ENV !== 'production';
console.log("isNotProduction:",isNotProduction)

console.log("imports/startup/server/index.js hi 2:01")

console.log(
  '\nprocess.env.NODE_ENV', NODE_ENV,
  '\nprocess.env.PORT', PORT,
  '\nprocess.env.MONGO_URL', MONGO_URL,
  '\nprocess.env.MONGODB_URI', MONGODB_URI,
);

console.log("==> before connect to mongoosedb")
try {

  mongoose.connect(MONGO_URL,{ useNewUrlParser: true })
  console.log("after sucessful connect to mongoosedb")
} catch(err) {
  console.log('error connecting to mongoose db err:',err)
}

//const Cat = mongoose.model('Cat', { name: String });

if (!User) console.log("User is null!")
if (!Quotation) console.log("Quotation is null!")


// const server = new ApolloServer({ typeDefs, resolvers,context: ({ req }) => ({
//     User,
//     Quotation
//   }) });
//console.log('schema:',schema)
// from Nov5, 2018
//   const server = new ApolloServer({
//   schema,
//   context: async ({ req }) => ({
//     User,
//     Quotation,
//   })
// });


const app = express();
//server.applyMiddleware({ app });
// from Nov 5, 2018
//server.applyMiddleware({ app, path: '/graphql' });




const server = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization)
    //user: await getUser(req)
  }),
  playground: {
    settings: {
      'editor.theme': 'light',
    },
  },
})

// for meteor account intergration
server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql'
})

WebApp.connectHandlers.use('/graphql', (req, res) => {
  if (req.method === 'GET') {
    res.end()
  }
})
// There are two options for using an IDE that will make authenticated GraphQL requests:
//
// Apollo devtools GraphiQL:
// Login to your app
// Open Apollo devtools to the GraphiQL section
// GraphQL Playground:
// Install with brew cask install graphql-playground
// Login to your app
// In the browser console, enter localStorage.getItem('Meteor.loginToken')
// Copy the string returned
// In Playground:
// At the top, enter http://localhost:3000/graphql
// Under HTTP HEADERS, enter { "authorization": "copied string" }

app.set('port', (isNotProduction? 4000:PORT || 4000));

// bind express with graphql


//------------------------------------------------------------------------------
// MIDDLEWARES
//------------------------------------------------------------------------------
// Apply middleware to parse incoming body requests into JSON format.
// app.use(helmet());

// When extended property is set to true, the URL-encoded data will be parsed with the qs library.
//
// On the contrary,
//
// when extended property is set to false, the URL-encoded data will instead be parsed with the querystring library.
app.use(express.urlencoded({ extended: true }));

// app.use(express.json());
// // Enable the app to receive requests from the React app when running locally.
if (isNotProduction) {
  console.log("DEVELOPMENT")
   app.use('*', cors({ origin: 'http://localhost:3000' }));
} else {
  console.log("PRODUCTION")
}
//app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: { User, Quotation } }));


//app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

//app.listen(port);


app.listen(app.get('port'), () => {
  console.log(`Apollo server listening on port: ${app.get('port')}`);
});
