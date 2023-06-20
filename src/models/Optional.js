module.exports = (sequelize, DataTypes) => {
  const Optional = sequelize.define(
    "Optional",
    {},
    {
      timestamps: true,
      underscored: true,
    }
  );
  Optional.associate = (db) => {
    Optional.belongsTo(db.Property, {
      foreignKey: {
        name: "propertyId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });

    Optional.belongsTo(db.OptionalType, {
      foreignKey: {
        name: "optionalTypeId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });
  };
  return Optional;
};
