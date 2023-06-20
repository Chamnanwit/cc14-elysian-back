module.exports = (sequelize, DataTypes) => {
  const Province = sequelize.define(
    "Province",
    {
      code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      nameInThai: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      nameInEnglish: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );
  Province.associate = (db) => {
    Province.hasMany(db.District, {
      foreignKey: {
        name: "provinceId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });
  };
  return Province;
};
