module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("AGENCY", "ADMIN"),
        // allowNull: false,
      },
      locked: {
        type: DataTypes.ENUM("YES", "NO"),
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
