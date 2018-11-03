import mongoose  from 'mongoose';

console.log('Importing quotation')

const schema = mongoose.Schema({
  _id: String,
  quote_no: Number,
  senderId: String,
  sales_person: String,
  quotation: {
      quote_no: Number,
      quote_date: String,
      price_selection: String,
      notes: String,
      final: Boolean,
      active: Boolean,
      username: String,
      sales_person: String,
      message: String,
      reason: String,
      item: {
          recipientID: String,
          ownderId: String,
          url: String,
          thumbnailImage: String,
          source: String,
          price: Number,
          qty: Number,
          shipping: Number,
          category: [String],
          title: String,
          condition: String,
          weight: Number,
          height: Number,
          length: Number,
          width: Number,
          language: String,
          username: String,
          chargeableWeight: Number,
          final: Boolean,
          requestor: String,
          quote_no: Number,
          category_info: {
              _id: String,
              category_name: String,
              category_name_ar: String,
              customs: Number,
              tax_aqaba: Number,
              tax_amm: Number,
              margin_amm: Number,
              margin_aqaba: Number,
              special_tax: Number,
              us_tax: Number,
              cap_aqaba: Number,
              cap_amm: Number,
              min_side_length: Number,
              keywords: String,
              min_lonng_side: Number,
              score: Number,
              match_score: Number
          },
              recipentID: String
          },
          prices: {
              amm_exp: {
                  destination: String,
                  type: String,
                  delivery: String,
                  price: Number
              },
              amm_std: {
                  destination: String,
                  type: String,
                  delivery: String,
                  price: Number
              },
              aq_exp: {
                  destination: String,
                  type: String,
                  delivery: String,
                  price: Number
              },
              aq_std: {
                  destination: String,
                  type: String,
                  delivery: String,
                  price: Number
              }
          }
      },
      date_created:String,
      create_by: String,
      last_updated: String,
      updated_by: String,
  }
);

const Quotation = mongoose.model('Quotation1', schema);
console.log('Quotation collection:',Quotation)
if (!Quotation) console.log("quotation.js Quotation is null!")

export default Quotation;
