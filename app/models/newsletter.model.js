module.exports = (sequelize, DataTypes) => {
    const Newsletter = sequelize.define("newsletter", {

      email: {
        type: DataTypes.STRING
      },
 
 
    });
  
    return Newsletter;
  };