const { User, RoomType, PricingPlan } = require("../models");

const roomTypeSeed = async () => {
  const roomTypeData = [
    { name: "studio" },
    { name: "moff" },
    { name: "duplex" },
    { name: "penthouses" },
    { name: "villa" },
  ];
  let res = await RoomType.bulkCreate(roomTypeData);
  process.exit(0);
};

roomTypeSeed();

const pricingPlanSeed = async () => {
  const pricingPlanData = [
    {
      id: 1,
      name: "Free",
      planType: "FREE",
      price: 0,
      expiration: "WEEKLY",
      topStatus: "DISABLE",
      limit: 5,
      locked: 1,
      numberOfTop: 0,
      status: "ACTIVE",
    },
    {
      id: 2,
      name: "Gold",
      planType: "GOLD",
      price: 49.99,
      expiration: "MONTHLY",
      topStatus: "ENABLE",
      limit: 20,
      locked: 1,
      numberOfTop: 5,
      status: "ACTIVE",
    },
    {
      id: 3,
      name: "Premium",
      planType: "PREMIUM",
      price: 99.99,
      expiration: "WEEKLY",
      topStatus: "DISABLE",
      limit: 50,
      locked: 0,
      numberOfTop: 10,
      status: "ACTIVE",
    },
  ];
  let res = await PricingPlan.bulkCreate(pricingPlanData);
  process.exit(0);
};

pricingPlanSeed();
