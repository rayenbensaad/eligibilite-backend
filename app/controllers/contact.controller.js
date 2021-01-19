const db = require("../models");
const Contact = db.contact;


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

  // Save Contact in the database
  Contact.create(contact)
    .then(data => {
      res.send(data);
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