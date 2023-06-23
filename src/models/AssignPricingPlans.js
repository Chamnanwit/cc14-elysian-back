module.exports = (sequelize, DataTypes) => {
  const AssingPricingPlan = sequelize.define(
    "AssingPricingPlan",
    {},
    {
      timestamps: true,
      underscored: true,
    }
  );
  AssingPricingPlan.associate = (db) => {
    AssingPricingPlan.belongsTo(db.PricingPlan, {
      foreignKey: {
        name: "pricingPlanId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });
  };
  return AssingPricingPlan;
};
