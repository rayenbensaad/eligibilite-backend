const db = require("../models");
const Form = db.form;


// Create and Save a new Form
exports.createForm = (req, res) => {
  // Validate request
  if (!req.body.nom_prenom) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Form
  const form = {
    nom_prenom: req.body.nom_prenom,
    code_postale: req.body.code_postale,
    num_tel: req.body.num_tel,
    email: req.body.email,
    date_rappel: req.body.date_rappel,
    isole: req.body.isole,
    energie_chauffage: req.body.energie_chauffage,
    nbr_personne: req.body.nbr_personne,
    revenu_annuel: req.body.revenu_annuel,
    surface_isoler: req.body.surface_isoler,
  };

  // Save Form in the database
  Form.create(form)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Get the  Form by id
exports.findFormById = (req, res) => {
  const formId = req.params.formId;
  Form.findByPk(formId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};


// Get all Forms 
exports.findAll = (req, res) => {
  Form.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Questions"
      });
    });
};


// Delete Form by Id
exports.deleteFormById = (req, res) => {
  const formId = req.params.formId;

  Form.destroy({
    where: {
      id: formId
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Form was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Form with id=${id}. Maybe Form was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Form with id=" + id
      });
    });
};

// Delete All Form
exports.deleteAllForms = (req, res) => {

  Form.destroy({
    where: {},
    truncate: false
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