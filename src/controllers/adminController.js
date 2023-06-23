const { PricingPlan } = require("../models");

exports.createPricingPlan = async (req, res, next) => {
  try {
    const {
      name,
      planType,
      price,
      limit,
      expiration,
      topStatus,
      locked,
      numberOfTop,
    } = req.body;

    const pricingplan = await PricingPlan.create({
      name: name,
      planType: planType,
      price: price,
      limit: limit,
      expiration: expiration,
      topStatus: topStatus,
      locked: locked,
      numberOfTop: numberOfTop,
    });

    res.status(201).json({ msg: "success" });
  } catch (err) {
    next(err);
  }
};

exports.getPricingPlanList = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(req.params);

    const PricingPlanList = await PricingPlan.findOne({
      attributes: [
        "name",
        "planType",
        "price",
        "limit",
        "expiration",
        "topStatus",
        "locked",
        "numberOfTop",
      ],
      where: { id: id },
    });

    res.status(200).json(PricingPlanList);
  } catch (err) {
    next(err);
  }
};
