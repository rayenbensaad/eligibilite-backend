module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define("contact", {
      nom_prenom: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      subject: {
        type: DataTypes.STRING
      },
      message: {
        type: DataTypes.STRING
      }    
 
    });
  
    return Contact;
  };