module.exports = app => {
    const form = require("../controllers/form.controller");
  
    // Create a new form
    app.post("/form", form.createForm);

    // Retrieve  form
    app.get("/form/:formId", form.findFormById);
   
    // Retrieve all forms 
    app.get("/form", form.findAll);

    //  Delete Form by Id 
    app.delete("/form/:formId", form.deleteFormById);

    // RDelete All forms 
    app.delete("/form", form.deleteAllForms);
  

  };