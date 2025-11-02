import { faker } from '@faker-js/faker';

export const generateMockPets = (num = 50) => {
	const pets = [];
	for (let i = 0; i < num; i++) {
		pets.push({
			name: faker.animal.petName(),
			specie: faker.animal.type(),
			birthDate: faker.date.past({ years: 5 }),
			adopted: false,
			owner: null,
			image: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
		});
	}
	return pets;
};
