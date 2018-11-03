import React from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
//import userFragment from '../../graphql/user/fragment/user';
//import Authors from '../../components/authors';
import QuotationForm from '../../components/quotation/quotation-form';
import Quotations from '../../components/quotation/quotations';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// Styled-components example usage
const Title = styled.h3`
  color: tomato;
`;
//------------------------------------------------------------------------------
const Json = styled.pre`
  word-wrap: break-word;
  white-space: pre-wrap;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class HomePage extends React.PureComponent {
  state = { quotation: null
   }

  handleSubmit = ({ quotation }) => {
    this.setState({ quotation });
  }

  render() {
  //  const { curUser } = this.props;
    const { quotation } = this.state;

    return (
      <div>
        <Title>Enter quotation no,  words from title and/or part# to get matching quotations:</Title>
        <Quotations />
        {/* Basscss example usage */}
        <div className="mb1" />
        <QuotationForm onSubmit={this.handleSubmit} />


      </div>
    );
  }
}
// <h3>Current User</h3>
// <Json>
//   {JSON.stringify(curUser, null, 2)}
// </Json>
HomePage.propTypes = {
  //curUser: null,
//  curUser: propType(userFragment),
};

HomePage.defaultProps = {
//  curUser: null,
};

export default HomePage;
