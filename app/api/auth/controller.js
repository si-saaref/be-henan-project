const { User } = require('../../db/models');
const bcrypt = require('bcrypt');
const {
	passwordChecker,
	userNameChecker,
	emailChecker,
	firstNameChecker,
	lastNameChecker,
} = require('../../helper/helper');

module.exports = {
	register: async (req, res) => {
		try {
			const { firstName, lastName, email, password, userName } = req.body;
			const checkUser = await User.findOne({
				where: { email },
			});

			if (checkUser) {
				res.status(406).json({ message: 'User is already registered', status: 406 });
				return;
			}

			try {
				await userNameChecker(userName.trim());
				firstNameChecker(firstName.trim());
				lastNameChecker(lastName.trim());
				emailChecker(email.trim());
				passwordChecker(password.trim());
			} catch (error) {
				res.status(406).json({ message: error.message, status: 406 });
				return;
			}

			const userPayload = await User.create({
				email: email.trim(),
				firstName: firstName.trim(),
				lastName: lastName.trim(),
				userName: userName.trim(),
				password: bcrypt.hashSync(password.trim(), 10),
			});

			if (!userPayload) {
				res.status(400).json({ message: 'Cannot create users due to server failure', status: 400 });
			}

			delete userPayload.dataValues.password;
			res.status(200).json({ message: 'Register successfully', status: 200, data: userPayload });
		} catch (error) {
			if (t) await t.rollback();
			res.status(500).json({ message: error.message || 'Internal Message Error', status: 500 });
		}
	},
};
