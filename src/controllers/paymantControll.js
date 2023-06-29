const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeSecretKey);

// const storeItems = new Map([
//   [1, { priceInCents: 499, price: price_1NMPXDKiz6RxD96BwlvRnN8E, name: "Elysian Gold Package Weekly" }],
//   [2, { priceInCents: 1799, price: price_1NMPY9Kiz6RxD96BaRuyuEhS, name: "Elysian Gold Package Monthly" }],
//   [3, { priceInCents: 999, price: price_1NMPZrKiz6RxD96BTUospZqx, name: "Elysian Premium Package Weekly" }],
//   [4, { priceInCents: 3599, price: price_1NMPaoKiz6RxD96B583Xd2PI, name: "Elysian Premium Package Monthly" }],
// ]);

exports.package = async (req, res, next) => {
  try {
    console.log("--------------------", req.body);
    const data = await stripe.checkout.sessions.create({
      success_url:
        "http://localhost:5173/successpay?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/",
      locale: "th",
      currency: "THB",
      // customer: ,
      line_items: [{ price: req.body.id, quantity: 1 }],
      mode: "payment",
    });
    console.log(data);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.packageData = async (req, res, next) => {
  try {
    const user = req.user;
    const data = req.query;
    const response = {};
    //   console.log("payment :", data);
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
      console.log("________1", session);
    if (session) {
      response.session = session;
    }

    //   await Payment.create({
    //     id: session.id,
    //     userId: user.id,
    //   });
    //   console.log("_______aa", req.query);

    return res.json({
      message: "success",
      ...response,
    });
  } catch (err) {
    next(err);
  }
};
