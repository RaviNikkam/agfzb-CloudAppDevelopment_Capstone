/**
 * Get all dealerships
 */

 const Cloudant = require('@cloudant/cloudant');

async function main(params) {
        const cloudant = Cloudant({
         url: params.COUCH_URL,
         plugins: { iamauth: { iamApiKey: params.IAM_API_KEY } }
        });
 
         if (params.dealership){
            var query = {
               "selector": {
                  "dealership": {
                     "$eq": params.dealership
                  }
               },
               "fields": [
                  "_id",
                  "_rev",
                  "id",
                  "name",
                  "dealership",
                  "review",
                  "purchase",
                  "purchase_date",
                  "car_make",
                  "car_model",
                  "car_year"
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
                  "id",
                  "name",
                  "dealership",
                  "review",
                  "purchase",
                  "purchase_date",
                  "car_make",
                  "car_model",
                  "car_year"
               ]
            }
         } 

         try {
             let db = await cloudant.use('reviews') 
                let result = await db.find(query);
                return { result }
                
         } catch (error) {
                 return { error1: error.description };
         }
 }