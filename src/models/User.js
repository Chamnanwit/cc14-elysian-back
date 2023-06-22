module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        validate: {
          is: /^[0-9]{10}$/,
        },
      },
      taxId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      profileImage: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("AGENCY", "ADMIN"),
        // allowNull: false,
      },
      locked: {
        type: DataTypes.BOOLEAN("TRUE", "FALSE"),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );
  User.associate = (db) => {
    User.hasMany(db.Property, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });

    User.hasMany(db.PurchaseHistory, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });
  };
  return User;
};
