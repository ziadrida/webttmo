import React, { Component,Fragment } from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';
import { Switch, Router } from 'react-router-dom';
import { BrowserRouter, Link,NavLink } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import userFragment from './graphql/user/fragment/user';
import { ScrollToTop, LoggedInRoute } from './components/route-wrappers';
//import LoginPage from './pages/login-page';
import HomePage from './pages/home-page';
import QuotationPage from './pages/quotation'
import NotFoundPage from './pages/not-found-page';
import LoginPage from './pages/login-page';

// {/* HOME */}
// <LoggedInRoute
//   exact
//   path="/"
//   component={HomePage}
//   overlay={LoginPage}
//   {...props}
// />
const Routes = props => (
  <ScrollToTop>

    <Switch>

      {/* HOME */}

      <LoggedInRoute
        exact
        path="/"
        component={NotFoundPage}
          overlay={LoginPage}
        {...props}
      />
      <LoggedInRoute
        exact
        path="/quotations"
        component={QuotationPage}
          overlay={LoginPage}
        {...props}
      />
        {/* NOT FOUND */}
      <Route
        component={NotFoundPage}
      />
    </Switch>
  </ScrollToTop>
);
/*
const Routes = props => (
  <ScrollToTop>
  <BrowserRouter>
  <Fragment>
  <ul>
  <li>   <NavLink exact to="/" activeStyle={{color:'orange'}} > Home </NavLink>    </li>
  <li>   <NavLink exact to="/quotations" activeStyle={{color:'orange'}}> Quotations </NavLink>    </li>
  <li>   <NavLink exact to="/user" activeStyle={{color:'orange'}}> User </NavLink>    </li>
  </ul>
  <hr/>

  <Switch>
      <Route exact path="/"   component={HomePage}  />
      <Route path="/quotations" component={QuotationForm} />
      <Route component={NotFoundPage}    />
    </Switch>

    </Fragment>
  </BrowserRouter>
  </ScrollToTop>
)
*/
Routes.propTypes = {
  curUser: propType(userFragment), // eslint-disable-line
};

Routes.defaultProps = {
  curUser: null,
};

export default Routes;
