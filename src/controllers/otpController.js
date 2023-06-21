const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// <=== function request OTP ===>

exports.otp = async (req, res, next) => {
	let { phoneNumber } = req.body;
	// console.log(phoneNumber);
	if (phoneNumber.startsWith('0')) {
		phoneNumber = phoneNumber.slice(1);
	}
	// console.log(phoneNumber);
	if (phoneNumber.length === 9) {
		try {
			const customerPhoneNumber = await client.verify.v2
				.services(process.env.TWILIO_ACCOUNT_SID)
				.verifications.create({
					to: `+66${phoneNumber}`,
					channel: 'sms',
				});
			console.log(customerPhoneNumber);

			res.status(200).json({
				message: `Verification is sent to 0${phoneNumber}`,
				customerPhoneNumber: customerPhoneNumber.to,
			});
		} catch (err) {
			next(err);
		}
	} else {
		res.status(400).json({ message: 'Wrong Number!' });
	}
};

// <=== function verify OTP ===>

exports.verify = async (req, res, next) => {
	const { code, phoneNumber } = req.body;

	console.log(code, phoneNumber);

	if (code.length === 6) {
		try {
			const data = await client.verify.v2
				.services(process.env.TWILIO_ACCOUNT_SID)
				.verificationChecks.create({
					to: `${phoneNumber}`,
					code: code,
				});

			if (data.status === 'approved') {
				console.log('User is Verified!!');

				//  #############################################
				try {
					const user = await User.findOne({ where: { phone: phoneNumber } });
					if (user) {
						const token = genToken({ id: user.id });
						res.status(201).json({
							message: 'User is Verified!!',
							token: token,
							statusOtp: data.status,
							user,
						});
					}

					if (!user) {
						res.status(201).json({
							message: 'User is Verified!! but not regis yet',
							statusOtp: data.status,
						});
					}
				} catch (err) {
					next(err);
				}

				//  #############################################
			} else {
				console.log('User Varifired Error');
				res.status(400).json({ message: 'User Varifired Error' });
			}
		} catch (err) {
			console.log('User Varifired Error');
			res.status(404).send('User Varifired Error');
		}
	} else {
		res.status(400).json({
			message: 'Wrong phone number or code :(',
		});
	}
};