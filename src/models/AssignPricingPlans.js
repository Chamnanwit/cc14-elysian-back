module.exports = (sequelize, DataTypes) => {
  const AssingPicingPlan = sequelize.define(
    "AssingPicingPlan",
    {},
    {
      timestamps: true,
      underscored: true,
    }
  );
  AssingPicingPlan.associate = (db) => {
    AssingPicingPlan.belongsTo(db.PicingPlan, {
      foreignKey: {
        name: "picingPlanId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });
  };
  return AssingPicingPlan;
};
