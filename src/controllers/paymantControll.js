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
    await stripe.checkout.sessions.create({
      success_url: "http://localhost:5173/", // หน้าชำระสำเร็จ
      cancelUrl: "http://localhost:5173/", // กลับไปหน้าไหนเมื่อยกเลิกการจ่ายเงิน
      locale: "th",
      currency: "THB",
      // customer: ,
      line_items: [{ price: "price_H5ggYwtDq4fbrJ", quantity: 1 }],
      mode: "payment",
    });
  } catch (err) {
    next(err);
  }
};
