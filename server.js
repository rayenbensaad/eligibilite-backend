const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
var path = require('path');
const db = require("./app/models");
var bcrypt = require("bcryptjs");

const User = db.user;


const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//db.sequelize.sync();
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

function initial() {
  User.create({
    username: 'admin',
    email:'eligibilitee@gmail.com',
    password: bcrypt.hashSync('admin', 8)
  });
 
}

require("./app/routes/form.routes")(app);
require("./app/routes/contact.routes")(app);
require("./app/routes/post.routes")(app);
require("./app/routes/user.routes")(app);


app.use('/uploads',express.static('uploads'))

app.use(express.static(path.join(__dirname, 'public')));


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});