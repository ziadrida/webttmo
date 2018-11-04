
import  Quotation  from '../../../../models/quotation';

const getQuotation = async (root, args, context) => {
  console.log('=>resolver  getQuotation args', args)
  //const { quotation: usr } = context;

  // if (!usr || !usr._id) {
  //   return null;
  // }
  var queryStr = {}
  if (args.search) {
    queryStr = {
      "$or": [{
          "quotation.item.MPN": {
            "$regex": args.search,
            "$options": "i"
          }
        },
        {
            "quotation.item.asin": {
              "$regex": args.search,
              "$options": "i"
            }
          },
        {
          "quotation.item.title": {
            "$regex": args.search,
            "$options": "i"
          }
        },
        {
          "quotation.item.category": {
            "$regex": args.search,
            "$options": "i"
          }
        },
        {
          "quotation.po_no": {
            "$regex": args.search,
            "$options": "i"
          }
        }
      ]
    }
  } else {
    queryStr = {
      quote_no: args.quote_no
    }
  }
  // Query current logged in quotation
  try {
    console.log('getQuotation queryStr:',queryStr)
    const curQuotation = await Quotation.find(queryStr).sort({"quote_no":-1}).limit(50).exec();
    console.log("curQuotation.length:",curQuotation.length)
    return curQuotation;
  } catch (exc) {
    console.log(exc);
    return null;
  }
};

export default getQuotation;
