// {
// 	"development": {
// 		"username": "adm-be-hpam",
// 		"password": "admHp4m2112",
// 		"database": "db-be-henan-project",
// 		"host": "127.0.0.1",
// 		"dialect": "postgres"
// 	}
// }

require('dotenv').config();

module.exports = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOSTNAME,
		dialect: process.env.DB_DIALECT,
	},
};
