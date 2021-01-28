module.exports = (sequelize, DataTypes) => {
    const Form = sequelize.define("form", {
      nom_prenom: {
        type: DataTypes.STRING
      },
      code_postale: {
        type: DataTypes.INTEGER
      },
      num_tel: {
        type: DataTypes.INTEGER
      },
      email: {
        type: DataTypes.STRING
      },
      commune: {
        type: DataTypes.STRING
      }, 
      logement: {
        type: DataTypes.STRING
      },


      // partie 2 

      energie_chauffage: {
        type: DataTypes.STRING
      },
      isole: {
        type: DataTypes.STRING,
        get: function() {
            return JSON.parse(this.getDataValue('isole'));
        }, 
        set: function(val) {
            return this.setDataValue('isole', JSON.stringify(val));
        }
      },
      surface_ITE: {
        type: DataTypes.STRING
      },
      surface_ITI: {
        type: DataTypes.STRING
      },
      surface_PAC: {
        type: DataTypes.STRING
      },
      nombre_pieces_PAC: {
        type: DataTypes.INTEGER
      },
      combles: {
        type: DataTypes.STRING
      },
      surface_combles: {
        type: DataTypes.STRING
      },
      surface_cave: {
        type: DataTypes.STRING
      },
      surface_garage: {
        type: DataTypes.STRING
      },
      surface_vide_sanitaire: {
        type: DataTypes.STRING
      },
      hauteur_vide_sanitaire: {
        type: DataTypes.STRING
      },
      lieu_maison: {
        type: DataTypes.STRING
      },
      nbr_personne: {
        type: DataTypes.STRING
      },
      revenu_annuel: {
        type: DataTypes.STRING
      },
    
    });
  
    return Form;
  };