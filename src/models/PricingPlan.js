module.exports = (sequelize, DataTypes) => {
  const PricingPlan = sequelize.define(
    "PricingPlan",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      planType: {
        type: DataTypes.ENUM("FREE", "GOLD", "PREMIUM"),
      },
      price: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: false,
      },
      priceCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expiration: {
        type: DataTypes.ENUM("WEEKLY", "MONTHLY"),
      },
      locked: {
        type: DataTypes.BOOLEAN("TRUE", "FALSE"),
        allowNull: false,
      },
      numberOfTop: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
        allowNull: false,
        defaultValue: "ACTIVE",
      },
    },
    {
      paranoid: true,
      timestamps: true,
      underscored: true,
    }
  );
  PricingPlan.associate = (db) => {
    PricingPlan.hasMany(db.AssingPricingPlan, {
      foreignKey: {
        name: "pricingPlanId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });

    PricingPlan.hasMany(db.PurchaseHistory, {
      foreignKey: {
        name: "pricingPlanId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });
  };
  return PricingPlan;
};
