const { RoomType, PricingPlan, OptionalType } = require("../models");

const hashed = bcrypt.hashSync("123456");

sequelize.sync({ force: true }).then(() => {
  return User.bulkCreate([
    { name: "Andy", password: hashed },
    { name: "Bobby", password: hashed },
    { name: "Candy", password: hashed },
    { name: "Danny", password: hashed },
    { name: "Eddy", password: hashed },
  ]);
});

const adminSeed = async () => {
  const adminData = [
    {
      firstName: "admin1",
      lastName: "page",
      phoneNumber: "0811111111",
      taxId: "1111111111111",
      email: "admin111@gmail.com",
      password: hashed,
      role: "ADMIN",
      locked: "FALSE",
    },
  ];
  let res = await User.bulkCreate(adminData);
  process.exit(0);
};

adminSeed();

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

const optionalTypeSeed = async () => {
  const optionalTypeData = [
    { id: 1, name: "เครื่องปรับอากาศ", type: "ROOM" },
    { id: 2, name: "TV", type: "ROOM" },
    { id: 3, name: "ตู้เย็น", type: "ROOM" },
    { id: 4, name: "เครื่องทำน้ำอุ่น", type: "ROOM" },
    { id: 5, name: "เครื่องซักผ้า", type: "ROOM" },
    { id: 6, name: "สระว่ายน้ำ", type: "COMMON" },
    { id: 7, name: "ฟิตเนส", type: "COMMON" },
    { id: 8, name: "สวน", type: "COMMON" },
    { id: 9, name: "ครัว", type: "COMMON" },
    { id: 10, name: "Co-working Space", type: "COMMON" },
  ];
  let res = await OptionalType.bulkCreate(optionalTypeData);
  process.exit(0);
};

optionalTypeSeed();
