const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_ID;
const client = require("twilio")(accountSid, authToken);
const { User } = require("../models");

// <=== function request OTP ===>

exports.otp = async (req, res, next) => {
  let { phoneNumber } = req.body;
  // console.log(phoneNumber);
  if (phoneNumber.startsWith("0")) {
    phoneNumber = phoneNumber.slice(1);
  }
  // console.log(phoneNumber);
  if (phoneNumber.length === 9) {
    try {
      const customerPhoneNumber = await client.verify.v2
        .services(serviceId)
        .verifications.create({
          to: `+66${phoneNumber}`,
          channel: "sms",
        });
      console.log(customerPhoneNumber, "CustomerNumber");

      res.status(200).json({
        message: `Verification is sent to 0${phoneNumber}`,
        customerPhoneNumber: customerPhoneNumber.to,
      });
    } catch (err) {
      console.log("eieiei");
      next(err);
    }
  } else {
    res.status(400).json({ message: "Wrong Number!" });
  }
};

// <=== function verify OTP ===>

exports.verify = async (req, res, next) => {
  const { code, phoneNumber } = req.body;

  // console.log(code, phoneNumber);

  if (code.length === 6) {
    try {
      const data = await client.verify.v2
        .services(serviceId)
        .verificationChecks.create({
          to: `+66${phoneNumber}`,
          code: code,
        });
      console.log(data);
      if (data.status === "approved") {
        console.log("User is Verified!!");

        //  #############################################
        try {
          const user = await User.findOne({
            where: { phoneNumber: phoneNumber },
          });

          console.log("kkkkkk", user);
          if (user) {
            const id = User.id;

            const userStatus = await User.update(
              { locked: 0 },
              {
                where: {
                  id: user.id,
                },
              }
            );
            console.log(userStatus);

            // const token = genToken({ id: user.id });
            const output = {
              message: "User is Verified!!",
              twUpdateStatus: data.status,
              userStatus: userStatus[0], // ถอดอาเร เพื่อเป็น obj โดยกำหนดเอาค่าตำแหน่ง index มาเลย
            };

            res.status(201).json(output);
          }
          if (!user) {
            res.status(201).json({
              message: "User is Verifired!! but not regis yet",
              statusOtp: data.status,
            });
          }
        } catch (err) {
          next(err);
        }

        //  #############################################
      } else {
        console.log("User Verifired Error");
        res.status(400).json({ message: "User Varifired Error" });
      }
    } catch (err) {
      console.log("User Varifired Error");
      res.status(404).send("User Varifired Error");
    }
  } else {
    res.status(400).json({
      message: "Wrong phone number or code :(",
    });
  }
};
