'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3,100],
          msg: "title must be atleast 3 characters in length"
        }
      }        
    }, 
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Role.hasMany(models.User, {foreignKey:'id'});
        Role.hasMany(models.Document, {foreignKey:'id'});
      }
    }
  });
  return Role;
};