const { User, RoomType, PricingPlan } = require("../models");
// const bcrypt = require("bcryptjs");

// const userSeed = async () => {
//   const hashedPassword = await bcrypt.hash("1234", 12);

//   const userData = [
//     { email: "andy@ggmail.com", phone: "1111111", password: hashedPassword },
//     { email: "bobby@ggmail.com", phone: "2222222", password: hashedPassword },
//     { email: "cathy@ggmail.com", phone: "3333333", password: hashedPassword },
//     { email: "danny@ggmail.com", phone: "4444444", password: hashedPassword },
//     { email: "eddy@ggmail.com", phone: "5555555", password: hashedPassword },
//     { email: "franky@ggmail.com", phone: "6666666", password: hashedPassword },
//     { email: "goofy@ggmail.com", phone: "7777777", password: hashedPassword },
//     { email: "honey@ggmail.com", phone: "8888888", password: hashedPassword },
//   ];
//   let res = await User.bulkCreate(userData);
//   console.log(res);
//   process.exit(0);
// };
// userSeed();

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
