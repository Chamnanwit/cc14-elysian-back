module.exports = (sequelize, DataTypes) => {
  const OptionalType = sequelize.define(
    "OptionalType",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("ROOM", "COMMON"),
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );
  OptionalType.associate = (db) => {
    OptionalType.belongsTo(db.Optional, {
      foreignKey: {
        name: "optionalTypeId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });
  };
  return OptionalType;
};
