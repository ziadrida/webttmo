
import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base'
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { HttpLink } from "apollo-link-http";
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from "apollo-link-error";
import { MeteorAccountsLink } from 'meteor/apollo'
import { ApolloLink } from 'apollo-link'

// REACT_APP_GRAPHQL_URI is defined in .env file. When the app is deployed to
// heroku, the REACT_APP_GRAPHQL_URI env variable needs to be reset to point to
// https://YOUR-APP-NAME.herokuapp.com/graphql (this will have precedence over
// the default value provided in the .env file). See the .env file on how to do
// this.
// const { NODE_ENV, REACT_APP_GRAPHQL_URI } = process.env;
//
// console.log("REACT_APP_GRAPHQL_URI:",REACT_APP_GRAPHQL_URI)
// const isNotProduction = NODE_ENV !== 'production';
// //const uri = isNotProduction ? 'http://localhost:3001/graphql' : REACT_APP_GRAPHQL_URI;
// const uri = isNotProduction ? 'http://localhost:3000/graphql' : "//localhost:5000/graphql";
// console.log("uri:",uri)
// // Log
// console.log(
//   '\nNODE_ENV', NODE_ENV,
//   '\nGRAPHQL_URI', uri,
// );
//
// const httpLink = createHttpLink({ uri });
//
// const authLink = setContext((_, { headers }) => {
//   // Get the authentication token from local storage if it exists
//   const token = localStorage.getItem('x-auth-token');
//   // Return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       // authorization: token ? `Bearer ${token}` : '',
//       authorization: token || '',
//     },
//   };
// });

// REACT_APP_GRAPHQL_URI is defined in .env file. When the app is deployed to
// heroku, the REACT_APP_GRAPHQL_URI env variable needs to be reset to point to
// https://YOUR-APP-NAME.herokuapp.com/graphql (this will have precedence over
// the default value provided in the .env file). See the .env file on how to do
// this.
const { NODE_ENV, REACT_APP_GRAPHQL_URI } = process.env;

const isNotProduction = NODE_ENV !== 'production';
//const uri = isNotProduction ? 'http://localhost:3001/graphql' : REACT_APP_GRAPHQL_URI;
const uri = isNotProduction ? 'http://localhost:4000/graphql' : REACT_APP_GRAPHQL_URI;

// Log
console.log("===> In graphqlconfig.js uri:", uri)

console.log('Meteor.absoluteUrl("graphql"): ',Meteor.absoluteUrl("graphql"))
//"http://localhost:4000/graphql"
const httpLink = new HttpLink({
//  uri:  Meteor.absoluteUrl("graphql")
   uri:  uri //"http://localhost:4000/graphql" //Meteor.absoluteUrl("graphql")
});
console.log('==>httplink:',httpLink)
//
// const cache = new InMemoryCache();
//
// const client = new ApolloClient({
//   link: httpLink,
//   cache
// });

const link1 = ApolloLink.from([
    new MeteorAccountsLink(),
    new HttpLink({
      uri: '/graphql'
    })
  ])

  console.log("using MeteorAccountsLink link:",link1)

// const client = new ApolloClient({
//   uri: '/graphql',
//   request: operation =>
//     operation.setContext(() => ({
//       headers: {
//         authorization: Accounts._storedLoginToken()
//       }
//     }))
// })

const client = new ApolloClient({
  link: ApolloLink.from([
    new MeteorAccountsLink(),
    new HttpLink({
      uri: '/graphql'
    })
  ]),
  cache: new InMemoryCache()
})

console.log("client:",client)
// ,
// onError: ({ networkError, graphQLErrors }) => {
//  console.log('==>graphQLErrors', graphQLErrors)
//  console.log('==>networkError', networkError)
// }
// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

export default client;
