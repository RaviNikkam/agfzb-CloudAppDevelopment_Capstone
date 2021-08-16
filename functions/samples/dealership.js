/**
 * Get all dealerships
 */

 const Cloudant = require('@cloudant/cloudant');

async function main(params) {
        const cloudant = Cloudant({
         url: params.COUCH_URL,
         plugins: { iamauth: { iamApiKey: params.IAM_API_KEY } }
  });
 
         if (params.st){
             console.log("Params provided", params.st)
            /* Here we create a Query in MongoDB Format: Note the $or used to take one or the other */
            var query = {
               "selector": {
                  "st": {
                     "$eq": params.st
                  }
               },
               "fields": [
                  "_id",
                  "_rev",
                  "state",
                  "city",
                  "st",
                  "address",
                  "zip",
                  "lat",
                  "long"
               ]
            }
         } else {
            var query = {
               "selector": {
                  "_id": {
                     "$gt": "0"
                  }
               },
               "fields": [
                  "_id",
                  "_rev",
                  "state",
                  "city",
                  "st",
                  "address",
                  "zip",
                  "lat",
                  "long"
               ]
            }
 
         } 

 try {
     let db = await cloudant.use('dealerships') 
        let result = await db.find(query);
        console.log(params.st)
        return { result }
        
 } catch (error) {
         return { error1: error.description };
 }
 
 }