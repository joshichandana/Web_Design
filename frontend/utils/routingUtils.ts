/**
 * 
 
 * 
 * This file will contain the various utility functions that we will be using 
 * that are related to routing
 * 
 */

 function returnUrl(uri:String) : String{
    // split by space
    const urlExtension = uri.split(" ").join('-');

    // convert all tokens to lowercase and concatenate by space
    return urlExtension.toLowerCase();

  }

  export {returnUrl};