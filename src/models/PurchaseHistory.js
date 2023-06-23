module.exports = (sequelize, DataTypes) => {
  const PurchaseHistory = sequelize.define(
    "PurchaseHistory",
    {
      paymentStatus: {
        type: DataTypes.ENUM("PENDING", "SUCCESS"),
      },
      orderStatus: {
        type: DataTypes.ENUM("ACTIVE", "EXPRIE"),
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );
  PurchaseHistory.associate = (db) => {
    PurchaseHistory.belongsTo(db.PricingPlan, {
      foreignKey: {
        name: "pricingPlanId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });

    PurchaseHistory.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });
  };
  return PurchaseHistory;
};
