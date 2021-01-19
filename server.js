const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
var path = require('path');



const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route

const db = require("./app/models");


//db.sequelize.sync();
require("./app/routes/form.routes")(app);
require("./app/routes/contact.routes")(app);
require("./app/routes/post.routes")(app);

app.use('/uploads',express.static('uploads'))

app.use(express.static(path.join(__dirname, 'public')));


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});