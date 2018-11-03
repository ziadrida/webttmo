import  Quotation  from './quotation';
import  User  from './user';
import  {genPassCode, PassCode}  from './pass-code';

console.log('Importing models')
if (!User) console.log("index.js User is null!")
if (!Quotation) console.log("index.js Quotation is null!")

export {
  Quotation,
  User,
  validateNewUser,
  validateLogin,
  PassCode,
  genPassCode,

};
