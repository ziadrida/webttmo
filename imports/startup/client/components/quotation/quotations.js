import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import quotationFragment from '../../graphql/quotation/fragment/quotation';
import quotationsQuery from '../../graphql/quotation/query/quotations';
import gql from 'graphql-tag';


import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MUIDataTable from 'mui-datatables'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

/*
const Quotations = ({ quotationsData }) => {
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
  };
  export default Quotations
  */

  getMuiTheme = () => createMuiTheme({
    // overrides: {
    //   MUIDataTableBodyCell: {
    //     root: {
    //       backgroundColor: "#FF0000"
    //     }
    //   }
    // }
  })

  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 500,
    },
  });

   onRowsDelete = (rowsDeleted) => {
     console.log('=> in rowsDeleted:',rowsDeleted)
   }
   onRowClick = (rowClicked) => {
     console.log('=> in rowClicked:',rowClicked)
   }

  const Quotations = (props) => {
    console.log('=> in Quotations component props',props)
  const { quotationsData, classes } = props

  const { loading, error, getQuotation ,variables  } = quotationsData;
  if (!getQuotation) return <p>Search for quotation</p>
  console.log('variables:',variables)

    const columns = ["quote_no", "username", "url","source","price","reason", "name","sales_person"];
    const options = {
      filterType: "dropdown",
      responsive: "scroll", //"stacked", //
      pagination: true,
      resizableColumns: true,
      rowHover: true,
      fixedHeader: false,
      print: false,
      download: false,
      onRowsDelete: onRowsDelete(),
      onRowClick: onRowClick()
    };
    var myData = []
  myData =  getQuotation.map(quotation => {
     item = (quotation.quotation && quotation.quotation.item?  quotation.quotation.item:null)
     return([
      quotation.quote_no,
      (quotation.quotation&&quotation.quotation.username? quotation.quotation.username:''),
      (item.url ?item.url: ''),
      (item.source ? item.source: ''),
      (item.price? item.price:null),
      (quotation.quotation && quotation.quotation.reason? quotation.quotation.reason:''),
      (quotation.user && quotation.user.name? quotation.user.name:''),
      (quotation.sales_person? quotation.sales_person: '')

          ])
        })

        console.log("myData:",myData)
        //    {(quotation.quotation? JSON.stringify(quotation.quotation.item,2,null):"")})

  if (!variables.quoteNo && !variables.search ) return <p> Enter search </p>

  if (loading) {
    return <p>Loading quotations ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }


  // return (
  //   <div>
  //     {getQuotation.map(quotation => (
  //       <div key={quotation._id}>
  //         {quotation.quote_no}, {quotation.senderId},
  //         {(quotation.quotation? quotation.quotation.username:'')},
  //         {(quotation.quotation? quotation.quotation.reason:'')},
  //         {(quotation.user? quotation.user.name:'')},
  //         {quotation.sales_person},
  //         {(quotation.quotation? JSON.stringify(quotation.quotation.item,2,null):"")}
  //       </div>
  //
  //     ))}
  //   </div>
  // );
  return (
    <MuiThemeProvider theme={this.getMuiTheme()}>
    <MUIDataTable
      title={"Quotations"}
      data={myData}
      columns={columns}
      options={options}
    />
     </MuiThemeProvider>
  );

  // return (
  //   <Paper className={classes.root}>
  //     <Table className={classes.table}>
  //       <TableHead>
  //         <TableRow>
  //           <TableCell>Quote No</TableCell>
  //           <TableCell numeric>Sender FID</TableCell>
  //           <TableCell numeric>Sales Person</TableCell>
  //           <TableCell numeric>user name</TableCell>
  //           <TableCell numeric>Category</TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {getQuotation.map(quotation => {
  //           return (
  //             <TableRow key={quotation._id}>
  //               <TableCell component="th" scope="row">
  //                 {quotation.quote_no}
  //               </TableCell>
  //               <TableCell >{quotation.senderId}</TableCell>
  //               <TableCell >{quotation.sales_person}</TableCell>
  //               <TableCell >{(quotation.user? quotation.user.name:'')}</TableCell>
  //               <TableCell >  {(quotation.quotation && quotation.quotation.item? quotation.quotation.item.category:'')}</TableCell>
  //             </TableRow>
  //           );
  //         })}
  //       </TableBody>
  //     </Table>
  //   </Paper>
  // );
  };




Quotations.propTypes = {
//    classes: PropTypes.object.isRequired,
  quotationsData: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    quotations: PropTypes.arrayOf(propType(quotationFragment)),
    refetch: PropTypes.func.isRequired,
  }).isRequired,
};


Quotations.defaultProps = {
  quoteNo: '',
  search: '',
};
//console.log("in component quotation.js")

const withData = graphql(quotationsQuery, {
  name: 'quotationsData',
  options: ({ quotationSearch }) => ({
    variables: {
      quoteNo: (quotationSearch && Number(quotationSearch.quoteNo)),
      search: (quotationSearch && quotationSearch.search)
    },
  }),
});
//export default withData(withStyles(styles)(Quotations));
export default withData(Quotations);
