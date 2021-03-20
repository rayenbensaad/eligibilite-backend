    const contact = require("../controllers/contact.controller");
    module.exports = app => {


    // Create a newsletter
    app.post("/newsletter", contact.newsletter);

     // Retrieve all newsletters 
    app.get("/newsletters", contact.findAllNewsletter);


  };