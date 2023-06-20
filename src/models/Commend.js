module.exports = (sequelize, DataTypes) => {
  const Commend = sequelize.define(
    "Commend",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );
  Commend.associate = (db) => {
    Commend.belongsTo(db.Property, {
      foreignKey: {
        name: "propertyId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });
  };
  return Commend;
};
