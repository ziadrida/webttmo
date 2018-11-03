import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import userFragment from './graphql/user/fragment/user';
import userQuery from './graphql/user/query/user';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Injects global data (current user, global settings, whatever) into
 * child components.
 */
const GlobalDataProvider = ({ userData, children }) => {
  console.log('in GlobalDataProvider children:',children)
  console.log('in GlobalDataProvider userData:',userData)
  const { error, loading, user } = userData;

  if (loading) {
    console.log("GDP loading")
    return <p>Loading ... </p>;
  }
  if (error) {
      console.log("GDP error")
    return <p>{error.message}</p>;
  }

  const api = {
    curUser: user,
  };
  console.log('call children:',children)
  return children(api);
};

GlobalDataProvider.propTypes = {
  userData: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    user: propType(userFragment),
    refetch: PropTypes.func.isRequired,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

// Apollo integration
const withData = graphql(userQuery, { name: 'userData' });

export default withData(GlobalDataProvider);
