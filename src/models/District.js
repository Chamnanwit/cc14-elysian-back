module.exports = (sequelize, DataTypes) => {
  const District = sequelize.define(
    "District",
    {
      code: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nameInThai: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nameInEnglish: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );
  District.associate = (db) => {
    District.belongsTo(db.Province, {
      foreignKey: {
        name: "provinceId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });

    District.hasMany(db.SubDistrict, {
      foreignKey: {
        name: "districtId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });
  };
  return District;
};
