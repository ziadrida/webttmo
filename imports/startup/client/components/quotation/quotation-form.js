import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class QuotationForm extends React.Component {
  state = {
    quoteNo: '',
    search: '',
    // TODO: add errors field
  }

  handleChange = ({ target }) => {
    console.log('in handleChange')
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('=> quotation-form in handleSubmit props',this.props)
    console.log('=> quotation-form in handleSubmit state',this.state)
    const { onSubmit } = this.props;
    const { quoteNo, search } = this.state;
    // TODO: disable btn on submit
    // TODO: validate fields
    // Pass event up to parent component
    const quotationSearch = { quoteNo, search };
     console.log('before onSubmit quotation:',quotationSearch)
    onSubmit({ quotationSearch });
  }

  render() {
    const { quoteNo, search } = this.state;
    console.log('render quotationForm quoteNo:', quoteNo, ",search: ",search)
    return (
      <form onSubmit={this.handleSubmit} autoComplete="off">
        {/* Material-UI example usage */}
        <TextField
          name="quoteNo"
          type="number"
          label="quote #"
          value={quoteNo}
          onChange={this.handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          name="search"
          type="text"
          label="Search"
          value={search}
          onChange={this.handleChange}
          margin="normal"
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Submit
        </Button>
      </form>
    );
  }
}

QuotationForm.propTypes = {
  onSubmit: PropTypes.func,
};

QuotationForm.defaultProps = {
  onSubmit: () => {},
};

export default QuotationForm;
