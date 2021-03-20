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
  console.log(req.body.num_tel);
  // Create a Form
  const form = {
    nom_prenom: req.body.nom_prenom,
    code_postale: req.body.code_postale,
    num_tel: req.body.num_tel,
    email: req.body.email,
    commune: req.body.commune,
    logement:req.body.logement,

    energie_chauffage: req.body.energie_chauffage,
    isole: req.body.isole,
    surface_ITE:req.body.surface_ITE,
    surface_ITI:req.body.surface_ITI,
    surface_PAC:req.body.surface_PAC,
    nombre_pieces_PAC:req.body.nombre_pieces_PAC,
    combles:req.body.combles,
    surface_combles:req.body.surface_combles,
    surface_cave:req.body.surface_cave,
    surface_garage:req.body.surface_garage,
    surface_vide_sanitaire:req.body.surface_vide_sanitaire,
    hauteur_vide_sanitaire:req.body.hauteur_vide_sanitaire,
    lieu_maison:req.body.lieu_maison,
    nbr_personne: req.body.nbr_personne,
    revenu_annuel: req.body.revenu_annuel,
    
  };

  // Save Form in the database
  Form.create(form)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Form."
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
        message: "Error retrieving Form with id=" + id
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