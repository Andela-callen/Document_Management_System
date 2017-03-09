'use strict';
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3,1000],
          msg: "title must be atleast 3 characters in length"
        }
      }      
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
  },
    access: {
      type: DataTypes.STRING,
      defaultValue: 'public',
      validate: {
        len: {
          isIn: ['private', 'public', 'role'],
          args: [3,100],
          msg: "access must be atleast 3 characters in length"
        }
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Document.belongsTo(models.User, {onDelete: 'CASCADE', foreignKey:'userId'});
        // Document.hasOne(models.Role, {foreignKey:'roleId'});
      }
    }
  });
  return Document;
};