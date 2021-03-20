const { authJwt } = require("../middleware");
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = (app) => {


    app.post("/signin", controller.signin);

    // Update User password 
    app.put("/auth/:userId", controller.updatePassword);

    // Update User password 
    app.post("/forgetPasword", controller.forgetPasword);

    // Update User Email 
    app.post("/UpdateEmail/:userId", controller.updateEmail);

    // Update User password 
    app.get("/getPassword", controller.getPassword);
};