const { PricingPlan, PurchaseHistory } = require("../models");

exports.checkPackageStatus = async () => {
  try {
    const result = await PurchaseHistory.findAll({
      where: { orderStatus: "ACTIVE" },
      attributes: ["id", "orderStatus", "pricingPlanId", "createdAt"],
      include: [
        {
          model: PricingPlan,
          attributes: ["id", "expiration"],
        },
      ],
    });
    // console.log(JSON.stringify(result, null, 4));

    const isWeekExpireCheck = (createAt) => {
      const now = new Date().getTime();
      const startDate = new Date(createAt).getTime() + 7 * 24 * 60 * 60 * 1000;

      return now > startDate;
    };
    isWeekExpireCheck();

    const isMouthExpireCheck = (createAt) => {
      const now = new Date().getTime();
      const startDate = new Date(createAt).getTime() + 30 * 24 * 60 * 60 * 1000;

      return now > startDate;
    };
    isMouthExpireCheck();

    for (let i = 0; i < result.length; i++) {
      let item = result[i];
      if (result[i].PricingPlan.expiration === "WEEKLY") {
        if (isWeekExpireCheck(result[i].createdAt)) {
          // console.log("zzzz", result[i].id);
          const PurchaseHistoryId = result[i].id;
          // Update Status
          const updatedRows = await PurchaseHistory.update(
            {
              orderStatus: "EXPIRE",
            },
            {
              where: { id: PurchaseHistoryId },
            }
          );
          console.log("kkkkkkweek", updatedRows);
        }
        // console.log("Checkkkk week", result[i].createdAt);
        // console.log(isWeekExpireCheck(result[i].createdAt));
      } else {
        result[i].PricingPlan.expiration === "MONTHLY";
        {
          if (isMouthExpireCheck(result[i].createdAt)) {
            // console.log("zzzz", result[i].id);
            const PurchaseHistoryId = result[i].id;
            // Update Status
            const updatedRows = await PurchaseHistory.update(
              {
                orderStatus: "EXPIRE",
              },
              {
                where: { id: PurchaseHistoryId },
              }
            );
            console.log("kkkkkkmonth", updatedRows);
          }
        }

        // console.log("Checkkkk month", result[i].createdAt);
        // console.log(isMouthExpireCheck(result[i].createdAt));
      }

      if (!("id" in item)) {
        break; // Exit the loop if there are no more elements with "id" property
      }

      // console.log(item); // Perform operations on each item in the object
    }

    // Update Status
    // const updatedRows = await PurchaseHistory.update(
    //   {
    //     orderStatus: "EXPIRE",
    //   },
    //   {
    //     where: { userId: 65 },
    //   }
    // );
    // console.log("kkkkkk", updatedRows);
  } catch (err) {
    console.log(err);
  }
};
