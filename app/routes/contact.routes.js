module.exports = app => {
    const contact = require("../controllers/contact.controller");
    const verifySignUp = require("../middleware/verifySignUp");

    // Create a new contact
    app.post("/contact", contact.createContact);

    // Retrieve  contact
    app.get("/contact/:contactId", contact.findContactById);
   
    // Retrieve all contacts 
    app.get("/contact", contact.findAll);

    //  Delete contact by Id 
    app.delete("/contact/:contactId", contact.deleteContactById);

    // RDelete All contacts 
    app.delete("/contact", contact.deleteAllContact);
  


  };