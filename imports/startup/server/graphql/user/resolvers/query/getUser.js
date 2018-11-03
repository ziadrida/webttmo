import {User}  from '../../../../models';

// Query user
const getUser = async (root, args, { User }) => {
  console.log('==? in getUser')
  if (args) console.log("args:", args.username)
  try {
    const result = await User.find({
      name: args.username
    });

    console.log("getUser query result:", result)
    return result;
    //  map() method creates a new array with the results of calling a function for every array element.
    // return result.map((x) => {
    //   // convert every array element's _id to string
    //   x._id = x._id.toString();
    //   return x;
    // });
  } catch (exc) {
    console.log(exc);
    return null;
  }
};

export default getUser;
