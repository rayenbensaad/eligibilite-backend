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
      date_rappel: {
        type: DataTypes.DATE
      },
      isole: {
        type: DataTypes.STRING
      },
      energie_chauffage: {
        type: DataTypes.STRING
      },
      nbr_personne: {
        type: DataTypes.STRING
      },
      revenu_annuel: {
        type: DataTypes.STRING
      },
      surface_isoler: {
        type: DataTypes.STRING
      }
    });
  
    return Form;
  };