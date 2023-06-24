module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define(
    "Property",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: false,
      },
      floor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalArea: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalUnit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalBedroom: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalBathroom: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalKitchen: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DECIMAL(8, 6),
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: true,
      },
      rentPeriod: {
        type: DataTypes.ENUM("DAILY", "MONTHLY", "YEARLY"),
      },
      locked: {
        type: DataTypes.BOOLEAN("TRUE", "FALSE"),
        allowNull: false,
      },
      published: {
        type: DataTypes.BOOLEAN("TRUE", "FALSE"),
      },
      topStatus: {
        type: DataTypes.BOOLEAN("TRUE", "FALSE"),
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );
  Property.associate = (db) => {
    Property.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });

    Property.belongsTo(db.RoomType, {
      foreignKey: {
        name: "roomTypeId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });

    Property.belongsTo(db.SubDistrict, {
      foreignKey: {
        name: "subDistrictId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });

    Property.hasMany(db.Image, {
      foreignKey: {
        name: "propertyId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });

    Property.hasMany(db.Commend, {
      foreignKey: {
        name: "propertyId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });

    Property.hasMany(db.Optional, {
      foreignKey: {
        name: "propertyId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });
  };
  return Property;
};
