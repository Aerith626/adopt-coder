import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export const generateMockUsers = (num = 50) => {
	const users = [];
	for (let i = 0; i < num; i++) {
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync('coder123', salt);

		users.push({
			_id: faker.database.mongodbObjectId(),
			first_name: faker.person.firstName(),
			last_name: faker.person.lastName(),
			email: faker.internet.email(),
			password: hashedPassword,
			role: faker.helpers.arrayElement(['user', 'admin']),
			pets: [],
			__v: 0
		});
	}
	return users;
};
