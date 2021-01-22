const db = require("../models");
const Contact = db.contact;
var nodemailer = require('nodemailer');




// Create and Save a new Contact
exports.createContact = (req, res) => {
  // Validate request
  if (!req.body.nom_prenom) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Contact
  const contact = {
    nom_prenom: req.body.nom_prenom,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  };
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: 'true',
    port: '465',
    auth: {
      user: 'eligibilitee@gmail.com', // must be Gmail
      pass: 'eligibilite1.'
    }
  });

  var mailOptions = {
    from: 'eligibilitee@gmail.com',
    to: 'rayenbensaad01@gmail.com', // must be Gmail
    cc:`${req.body.nom_prenom} <${req.body.email}> ${req.body.message}`,
    subject: `contact :  ${req.body.subject}`,
    html: `
          <h1>Welcome </h1>
          <p>${req.body.message}</p>
          `
  };
  // Save Contact in the database
  Contact.create(contact)
    .then(data => {
      res.send(data);
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({
            message: 'successfuly sent!'
          })
        }
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contact."
      });
    });
};

// Get the  Contact by id
exports.findContactById = (req, res) => {
  const contactId = req.params.contactId;
  Contact.findByPk(contactId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Contact with id=" + contactId
      });
    });
};


// Get all contacts 
exports.findAll = (req, res) => {
  Contact.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Contacts"
      });
    });
};


// Delete Contact by Id
exports.deleteContactById = (req, res) => {
  const contactId = req.params.contactId;

  Contact.destroy({
    where: {
      id: contactId
    }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Contact was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Contact with id=${id}. Maybe Form was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Contact with id=" + id
    });
  });
};

// Delete All Contact
exports.deleteAllContact = (req, res) => {

  Contact.destroy({
    where: {},
    truncate: true
  })
  .then(nums => {
    res.send({ message: `${nums} Form were deleted successfully!` });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all Form."
    });
  });
};