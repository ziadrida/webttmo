import React from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import userFragment from '../../graphql/user/fragment/user';
import Quotations from '../../components/quotation/quotations';
import QuotationForm from '../../components/quotation/quotation-form';
//import QuotationAndPosts from '../../components/quotation-and-posts';

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
class QuotationPage extends React.PureComponent {

  state =  { quotationSearch: null }


  handleSubmit = ({ quotationSearch }) => {
    console.log("quotationPage handleSubmit quotationSearch:", quotationSearch)
    this.setState({ quotationSearch });

  }

  render() {
    console.log('render QuotationPage ', this.props)
    console.log('render QuotationPage ', this.state)
    const { curUser } = this.props;
    const { quotationSearch } = this.state;
//  <Quotations />

    return (
      <div>
        <Title >
        Search for quotations by any field value or by quote no</Title>

        {/* Basscss example usage */}
        <div className="mb1" />

        <QuotationForm onSubmit={this.handleSubmit} />
         <Quotations  quotationSearch={quotationSearch}/>

      </div>
    );
  }
}

QuotationPage.propTypes = {
  curUser: propType(userFragment),
};

QuotationPage.defaultProps = {
  curUser: null,
};

export default QuotationPage;
