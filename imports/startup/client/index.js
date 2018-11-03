
import { Meteor } from "meteor/meteor";

// from create-react-app client index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';


import * as serviceWorker from './serviceWorker';
import Routes from './routes';
import App from './app';


//import { ApolloLink, from } from "apollo-link";
//import { ApolloClient } from "apollo-client";
//import { HttpLink } from "apollo-link-http";
//import { InMemoryCache } from "apollo-cache-inmemory";

//const App = () => <h1>Hello</h1>


console.log("from startup - client - index.j D ")

Meteor.startup(() => {
// call react DOM render function
  console.log("Meteor.startup -> render App")
//  render (<App />, document.getElementById("app"));
//  ReactDOM.render(<App />, document.getElementById('root'));
  ReactDOM.render(<App component={Routes} />, document.getElementById('root'));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
//  serviceWorker.unregister();
});
