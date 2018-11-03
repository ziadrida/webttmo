import React, { Component,Fragment } from 'react';
import { BrowserRouter, Link,NavLink, Route, Router,  Switch } from 'react-router-dom';
import ApolloClient from "apollo-client";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import client from './graphqlconfig';
import QuotationForm from '../components/quotation/quotation-form'
import Quotations from '../components/quotation/quotations'
import { ThemeProvider } from 'styled-components';
import createBrowserHistory from 'history/createBrowserHistory';

import GlobalDataProvider from '../global-data-provider';
import scTheme from '../theme/sc';
import muiTheme from '../theme/mui';
import { MuiThemeProvider } from '@material-ui/core/styles';
//import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AppBarComponent from './appbar'



//import Menu from 'material-ui/svg-icons/navigation/menu';
const history = createBrowserHistory();

//console.log('=> in app index ')



const Navigation = () => {
  return (
    <div>
    <ul>
    <li>   <NavLink exact to="/" activeStyle={{color:'orange'}} > Home </NavLink>    </li>
    <li>   <NavLink exact to="/quotations" activeStyle={{color:'orange'}}> Quotations </NavLink>    </li>
    <li>   <NavLink exact to="/user" activeStyle={{color:'orange'}}> User </NavLink>    </li>
    </ul>
    <hr/>
    </div>
  );
};
// const App = ({component}) => (
// //console.log('in app',component),
//
//       <ApolloProvider client={client}>
//
//          <h1> hello now 2 </h1>
//          <BrowserRouter>
//
//           <Fragment>
//            <Navigation />
//
//           <Switch>
//           <Route exact path="/" render={() => <div> Home </div> }  />
//           <Quotations quotationData={{quoteNo: 67221}} />
//
//           <Route path="/quotations" component={QuotationForm} />
//           <Route  render={() => <h3> Not Found </h3> }  />
//           </Switch>
//           </Fragment>
//            </BrowserRouter>
//         </ApolloProvider>
// );

// component is the routes
// const App = ({component}) => (
// console.log('in app',component),
//     <Router history={history}>
//       <ApolloProvider client={client}>
//          <h1> hello now 1 </h1>
//       </ApolloProvider>
//     </Router>
//
// );

// // component is the routes
// const App = ({ component }) => (
//   <ThemeProvider theme={scTheme}>
//     <Router history={history}>
//       <ApolloProvider client={client}>
//         <MuiThemeProvider theme={muiTheme}>
//           <GlobalDataProvider>
//             {globalDataProps => (
//               React.createElement(component, { ...globalDataProps })
//             )}
//           </GlobalDataProvider>
//         </MuiThemeProvider>
//       </ApolloProvider>
//     </Router>
//   </ThemeProvider>
// );
//
// const About = () => (
//   <div>
//     <h2>About</h2>
//   </div>
// );
//
// const App1 = () => (
//   <div>
//     <h2>About</h2>
//   </div>
// );
//
// class AppBarComponent extends Component {
//   state = {
//     logged: true,
//   };
//
//   handleChange = (event, logged) => {
//     this.setState({ logged });
//   };
//
//   render() {
//     return (
//       <Router>
//         <div>
//           <AppBar
//             title="Title"
//             iconElementLeft={
//               <IconMenu
//                 iconButtonElement={<IconButton ><Menu /></IconButton>}
//                 iconStyle={{ color: '#fff' }}
//               >
//                 <MenuItem primaryText="Menu Item 1" />
//                 <MenuItem primaryText="Menu Item 2" />
//                 <MenuItem primaryText={this.state.logged ? 'Welcome user' : 'Login'} />
//               </IconMenu>
//           }
//           >
//             <Tabs >
//               <Tab label="Menu Item 1" containerElement={<Link to="/" />}/>
//
//               <Tab label="Menu Item 2" containerElement={<Link to="/about" />}  />
//               <Tab label={this.state.logged ? 'Welcome user' : 'Login'} />
//             </Tabs>
//           </AppBar>
//           <Route exact path="/" component={App1} />
//           <Route path="/about" component={About} />
//         </div>
//       </Router>
//     );
//   }
// }
// component is the routes

const App = ({ component }) => (
  <ThemeProvider theme={scTheme}>
    <Router history={history}>
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={muiTheme}>
          <AppBarComponent />

                    <GlobalDataProvider>
                      {globalDataProps => (
                        React.createElement(component, { ...globalDataProps })
                      )}
                    </GlobalDataProvider>

        </MuiThemeProvider>
      </ApolloProvider>
    </Router>
  </ThemeProvider>
);


// link to graphcms
// console.log("imports/ui/App.js 8:50")
// const client = new ApolloClient({
//   //uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
//   uri: "https://api-euwest.graphcms.com/v1/cjmzv02i91lbf01ghac62kqz1/master"
// });


// console.log("call getQuotation ==> ");

// const QUOTATION_QUERY = gql`
// {
//   getQuotation(quote_no: 61772) {
//     quote_no
//     senderId
//     sales_person
//     user {
//       name
//     }
//   }
// }
// `;
// client.query({
// query: QUOTATION_QUERY
// }).then(res =>
//     console.log("app index.js -> manual quotation query results=> ",res)
//  )
 const Quotes = () => {
 return (
  <Query query={QUOTATION_QUERY}>
     {({ loading,error, data }) => {
       if (loading) return "Loading ...";
       if (error) return "Error loading quotation"
       const { getQuotation } = data;

       return (
         <li key={getQuotation.quote_no}>
         <h1> {getQuotation.quote_no} - {getQuotation.senderId } - {(getQuotation.user? getQuotation.user.name: "")}</h1>
         </li>)

     }}
  </Query>)
 }
//console.log("in client app index.js ");


 //const App = () => <h1>Hello 3</h1>
// console.log("call client.query before USER_QUERY ");
//
// const USER_QUERY = gql`
//  {
//  getUser(username:"Ziad Rida") {
//   name
//  }
// }
// `;
//
//  client.query({
//  query: USER_QUERY
// }).then(res =>
//      console.log("App.js -> user query results=> ",res)
// )


console.log("after call client.query  ");

// const App = () => (
//   <h1> Hello new 12 </h1>
// )

// const NewRoute = () => {
//   return (
//     <div>
//     <p>
//     New Route
//     </p>
//     </div>
//   )
// }
//
// class App extends Component {
//   state = {
//     quotations: [],
//     fields: {}
//   }
//   onSubmit = fields => {
//     console.log("App comp got: ",fields)
//     this.setState({fields});
//   }
//   render() {
//     return (
//       <ApolloProvider client={client}>
//       <div className="App">
//       <header>
//       <h1> Techtown Mail Order Admin </h1>
//       </header>
//
//       <BrowserRouter>
//       <Fragment>
//
//       <ul>
//       <li>   <Link to="/" > Home </Link>    </li>
//       <li>   <Link to="/quotations" > Quotations </Link>    </li>
//       </ul>
//       <hr/>
//       <Switch>
//       <Route exact path="/" render={() => <div> Home </div> }  />
//       <Route path="/quotations" component={QuotationForm} />
//       <Route  render={() => <h3> Not Found </h3> }  />
//       </Switch>
//     {/*  <Route path="/new" component={NewRoute}  /> */}
//
// </Fragment>
// </BrowserRouter>



  {/*
    <QuotationForm onSubmit={fields => this.onSubmit( fields)}  />
    <p>
    {JSON.stringify(this.state.fields,null,2)}
    </p>
<Query query={USER_QUERY}>
  { ({loading, error, data} ) => {
    if (loading) return <p>"Loading ..."</p>;
    if (error) return <p>Error 1 :(</p>;
      const { getUser } = data;
           return getUser.map(user =>
             <li key={user.name}>
             <h1> - {user.name} - {user.real_name } - {user.phone_no } - {user.email } - </h1>
           </li>)
  }}
 </Query>

 <Query query={QUOTATION_QUERY}>
    {({ loading,error, data }) => {
      if (loading) return "Loading ...";
      if (error) return "Error loading quotation"
      const { getQuotation } = data;

      return (
        <li key={getQuotation.quote_no}>
        <h1> {getQuotation.quote_no} - {getQuotation.senderId } - {(getQuotation.user? getQuotation.user.name: "")}</h1>
        </li>)

    }}
 </Query>
 */}

//
// </div>
//       </ApolloProvider>
//     );
//   }
// }


export default App;
