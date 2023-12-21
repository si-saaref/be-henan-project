const { User } = require('../db/models');

const passwordChecker = (password) => {
	if (password.length < 6) {
		throw new Error('Password is invalid.\n Password should contain at least 6 characters');
	}

	if (!/[a-z]/g.test(password)) {
		throw new Error('Password is invalid.\n Password should contain lowercase letter');
	}

	if (!/[A-Z]/g.test(password)) {
		throw new Error('Password is invalid.\n Password should contain capitalize letter');
	}

	if (!/[0-9]/g.test(password)) {
		throw new Error('Password is invalid.\n Password should contain numbers');
	}

	return true;
};

const userNameChecker = async (userName) => {
	const checkUser = await User.findOne({
		where: { userName },
	});

	if (checkUser) {
		throw new Error('Username is not available.\n Please try another one');
	}

	if (userName.length === 0) {
		throw new Error('Username should not be empty.\n Plase fill it correctly');
	}

	return true;
};

const emailChecker = (email) => {
	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(email)) {
		throw new Error('Email is invalid.\n Plase check again your email');
	}
	return true;
};

const firstNameChecker = (firstName) => {
	if (firstName.length === 0) {
		throw new Error('First name should not be empty.\n Plase fill it correctly');
	}
	return true;
};

const lastNameChecker = (lastName) => {
	if (lastName.length === 0) {
		throw new Error('Last name should not be empty.\n Plase fill it correctly');
	}
	return true;
};

module.exports = {
	passwordChecker,
	userNameChecker,
	emailChecker,
	firstNameChecker,
	lastNameChecker,
};
