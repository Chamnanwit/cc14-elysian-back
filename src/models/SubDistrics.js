module.exports = (sequelize, DataTypes) => {
  const SubDistrict = sequelize.define(
    "SubDistrict",
    {
      code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      nameInThai: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      nameInEnglish: {
        type: DataTypes.STRING,
        allowNull: true,
        // unique: true,
      },
      latitude: {
        type: DataTypes.DECIMAL(8, 6),
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );
  SubDistrict.associate = (db) => {
    SubDistrict.belongsTo(db.District, {
      foreignKey: {
        name: "districtId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });

    SubDistrict.hasMany(db.Property, {
      foreignKey: {
        name: "subDistrictId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });
  };
  return SubDistrict;
};
