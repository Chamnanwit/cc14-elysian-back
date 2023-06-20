module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      imageLink: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );
  Image.associate = (db) => {
    Image.belongsTo(db.Property, {
      foreignKey: {
        name: "propertyId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });
  };
  return Image;
};
