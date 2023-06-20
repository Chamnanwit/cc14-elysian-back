module.exports = (sequelize, DataTypes) => {
  const RoomType = sequelize.define(
    "RoomType",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );
  RoomType.associate = (db) => {
    RoomType.hasMany(db.Property, {
      foreignKey: {
        name: "roomTypeId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });
  };
  return RoomType;
};
