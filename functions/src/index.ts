import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const algoliasearch = require("algoliasearch");


let serviceAccount: any;
let storageBucket: string = "";
const environment = functions.config().app.environment;
if (environment === "staging") {
  serviceAccount = require("../serviceAccount-staging.json");
  storageBucket = "emails-show-8eb6f.appspot.com";
} else if (environment === "production") {
  serviceAccount = require("../serviceAccount-production.json");
  storageBucket = "emails-show-prod.appspot.com";
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: storageBucket
});

export const getEnvironment = functions.https.onCall(async (data, context) => {
  return { environment: environment };
});

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;
const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex('jobs');
exports.addToIndex = functions.firestore.document('jobs/{jobId}')
    .onCreate(snapshot => {
        const data = snapshot.data();
        const objectID = snapshot.id;
        console.log(data)
        console.log(objectID)
        return index.saveObject({...data, objectID});
    });
exports.updateIndex = functions.firestore.document('jobs/{jobId}')
    .onUpdate((change) => {
        const newData = change.after.data();
        const objectID = change.after.id;
        return index.saveObject({...newData, objectID});
    });
exports.deleteFromIndex = functions.firestore.document('jobs/{jobId}')
    .onDelete(snapshot => {
        return index.deleteObject(snapshot.id);
    });

