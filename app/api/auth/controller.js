const { User } = require('../../db/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
				where: {
					email: email.trim(),
				},
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
	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			const userPayload = await User.findOne({
				where: {
					email: email.trim(),
				},
			});
			if (!userPayload) {
				res.status(401).json({ message: "Email and Password didn't match", status: 401 });
				return;
			} else {
				const checkPassword = bcrypt.compareSync(password.trim(), userPayload.password);
				if (!checkPassword) {
					res.status(401).json({ message: "Email and Password didn't match", status: 401 });
					return;
				}
			}
			const token = jwt.sign(
				{
					user: {
						id: userPayload.id,
						email: userPayload.email,
						firstName: userPayload.firstName,
						lastName: userPayload.lastName,
					},
				},
				'secret',
				{
					expiresIn: '24h',
				}
			);

			const dataPayload = {
				token,
			};
			res.status(200).json({ message: 'Login Successfully', status: 200, data: dataPayload });
		} catch (error) {
			res.status(500).json({ message: error.message || 'Internal Message Error', status: 500 });
		}
	},
	updateUser: async (req, res, next) => {
		try {
			const { userId } = req.user;
			const { firstName, lastName, email, userName } = req.body;

			const checkUser = await User.findOne({
				where: { id: userId },
			});

			if (!checkUser) {
				res.status(404).json({ message: 'User not found', status: 200 });
				return;
			}

			try {
				await userNameChecker(userName.trim());
				firstNameChecker(firstName.trim());
				lastNameChecker(lastName.trim());
				emailChecker(email.trim());
			} catch (error) {
				res.status(406).json({ message: error.message, status: 406 });
				return;
			}

			const updatedUser = await checkUser.update({
				id: userId,
				firstName: firstName.trim(),
				lastName: lastName.trim(),
				email: email.trim(),
				userName: userName.trim(),
			});
			delete updatedUser.dataValues.password;
			res.status(200).json({ message: 'Successfully update user', status: 200, data: updatedUser });
		} catch (error) {
			next(error);
			res.status(500).json({ message: error.message || 'Internal Message Error', status: 500 });
		}
	},
};
