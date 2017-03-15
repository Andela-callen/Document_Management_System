import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    roleId: {
      type : DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Role Id must be an integer'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 100],
          msg: "username must be at least 3 characters in length"
        }
      }   
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: "firstname must be at least 3 characters in length"
        }
      }   
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: "lastname must be at least 3 characters in length"
        }
      }   
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [6, 128],
          msg: "Email address must be between 6 and 128 characters in length"
        },
        isEmail: {
          msg: "Email address must be valid"
        }
        
      }   
    },
    password_digest: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password_confirmation: {
      type: DataTypes.VIRTUAL
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        User.belongsTo(models.Role, {onDelete: 'CASCADE', foreignKey: "roleId"});
        User.hasMany(models.Document, {onDelete: 'CASCADE', foreignKey:"userId"});
      }
    }
  });


  const hasSecuredPassword = (user, options, callback) =>{
    if (user.password != user.password_confirmation) {
      throw new Error("Password confirmation doesn't match Password");
    }
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) return callback(err);
      user.set('password_digest', hash);
      return callback(null, options);
    });

  };

  User.beforeCreate((user, options, callback) => {
    user.email = user.email.toLowerCase();
    // console.log(user);
    if (user.password){
      hasSecuredPassword(user, options, callback)
    }
    else{
      return callback(null, options);
    }
  });

  User.beforeUpdate((user, options, callback) => {
    user.email = user.email.toLowerCase();
    if (user.password){
      hasSecuredPassword(user, options, callback);
    }
    else {
      return callback(null, options);
    }
  });

  return User;
};


// module.exports = User;