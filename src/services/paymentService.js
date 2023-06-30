const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeSecretKey);

exports.package = await stripe.checkout.sessions.create({
  success_url: 'https://example.com/success', // หน้าชำระสำเร็จ
  cancel_url: 'https://example.com/success', // กลับไปหน้าไหนเมื่อยกเลิกการจ่ายเงิน
  locale: th,
  currency: THB,
  // customer: ,
  line_items: [
    {price: 'price_H5ggYwtDq4fbrJ', quantity: 2},
  ],
  mode: 'payment',
});