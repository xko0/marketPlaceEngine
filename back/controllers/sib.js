const SibApiV3sdk = require("sib-api-v3-sdk");
require('dotenv').config()

exports.sendEmail = (req, res, next) => {
    const email = req.query.email;
  
    // auth + config
    let defaultClient = SibApiV3sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.SIB_API_KEY;
  
    // creation contact
    let apiInstance = new SibApiV3sdk.ContactsApi();
    let createContact = new SibApiV3sdk.CreateContact();
    createContact.email = email;
    createContact.listIds = [43]
  
    // appel API
    apiInstance.createContact(createContact).then(
      (data) => {
        res.status(200);
        res.send("success");
      },
      function (error) {
        res.status(500);
        res.send("failure");
      }
    );
  }