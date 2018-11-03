const prepare = (o) => {
  console.log('prepare')
o._id = o._id.toString()
return o
}

export default {

  Quotation: {
     async user(quotation,args, { User } ) {
       if (quotation) console.log('quotation=>:',quotation)
       if (quotation) console.log('quotation===>>:',quotation.senderId)
       const result = await User.find({userId: quotation.senderId});
       console.log("query result:",result)
       //  map() method creates a new array with the results of calling a function for every array element.
       return result.map((x) => {
         // convert every array element's _id to string
         x._id = x._id.toString();
         return x;
       });
     },

   },
  Query: {
    hi: () => {
      return "Hello from resolvers!"
    },
    allCats: async (parent, args, { Cat }) => {
      // { _id: 123123, name: "whatever"}
      const cats = await Cat.find();
      return cats.map((x) => {
        x._id = x._id.toString();
        return x;
      });
    },
    getQuotation: async (parent, args, { Quotation  }) => {
      console.log('=>resolver getQuotation args',args)

      console.log("parent:",parent)
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
            }
          ]
        }
      } else {
        queryStr = {
          quote_no: args.quote_no
        }
      }
      const result = await Quotation.find(queryStr);
      console.log("quotation result:",result)
      //  map() method creates a new array with the results of calling a function for every array element.

      return result.map((x) => {
        // convert every array element's _id to string
          x._id = x._id.toString();
        return x;
      });
    }, // end getQuotation
    getUser: async (parent, args, { User  }) => {
      console.log("=> resolver getUser args",args)
      if (args) console.log("args:",args.username)
      const result = await User.find({name: args.username});
      console.log("query result:",result)
      //  map() method creates a new array with the results of calling a function for every array element.
      return result.map((x) => {
        // convert every array element's _id to string
        x._id = x._id.toString();
        return x;
      });
    },
    user: async (parent, args,{User}) => {
      console.log('=> resolver user senderId:',args)
      console.log('parent:',parent)
      const result = await User.find({_id: args.senderId});
      console.log("query result:",result)
      //  map() method creates a new array with the results of calling a function for every array element.
      return result.map((x) => {
        // convert every array element's _id to string
        x._id = x._id.toString();
        return x;
      });
    },
  },



  Mutation: {
    createCat: async (parent, args, { Cat }) => {
      // { _id: 123123, name: "whatever"}
      const kitty = await new Cat(args).save();
      kitty._id = kitty._id.toString();
      return kitty;
    },
    createQuotation: async (parent, args, { Quotation }) => {
      // { _id: 123123, name: "whatever"}
      const quote = await new Quotation(args).save();
      quote._id = quote._id.toString();
      return quote;
    },
  },
};
