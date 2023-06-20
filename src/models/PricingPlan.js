module.exports = (sequelize, DataTypes) => {
  const PicingPlan = sequelize.define(
    "PicingPlan",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: false,
      },
      limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expiration: {
        type: DataTypes.ENUM("WEEKLY", "MONTHLY"),
      },
      topStatus: {
        type: DataTypes.ENUM("DISABLE", "ENABLE"),
      },
      locked: {
        type: DataTypes.ENUM("YES", "NO"),
      },
      numberOfTop: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );
  PicingPlan.associate = (db) => {
    PicingPlan.hasMany(db.AssingPicingPlan, {
      foreignKey: {
        name: "picingPlanId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });

    PicingPlan.hasMany(db.PurchaseHistory, {
      foreignKey: {
        name: "picingPlanId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });
  };
  return PicingPlan;
};
