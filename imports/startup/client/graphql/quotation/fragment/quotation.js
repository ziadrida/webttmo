import gql from 'graphql-tag';
//import postFragment from '../../post/fragment/post';

//console.log("in grapphql quotation fraqment quotation.js")
const quotationFragment = gql`
  fragment quotationFragment on Quotation {
    _id
    quote_no
    senderId
    sales_person
    user {
      name
    }
    quotation {
      quote_no
      quote_date
      price_selection
      notes
      final
      active
      username
      sales_person
      message
      reason
      item {
          recipientID
          ownderId
          url
          thumbnailImage
          source
          price
          qty
          shipping
          category
          title
          condition
          weight
          height
          length
          width
          language
          username
          chargeableWeight
          final
          requestor
          quote_no
          recipentID
          }
    }
  }

`;

// posts {
//   ...postFragment
// }
// }
// ${postFragment}
export default quotationFragment;
