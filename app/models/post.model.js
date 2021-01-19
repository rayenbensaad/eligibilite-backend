module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("post", {
      author: {
        type: DataTypes.STRING
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        allowNull: false,
        defaultValue: DataTypes.fn('NOW')
      },
      subject: {
        type: DataTypes.STRING
      },
      content: {
        type: DataTypes.STRING
      }, 
      picture: {
        type: DataTypes.STRING
      }    
 
    });
  
    return Post;
  };