import { Router } from 'express';
import { generateMockUsers } from '../utils/mockingUsers.js';
import { generateMockPets } from '../utils/mockingPets.js';
import UsersDao from '../dao/Users.dao.js';
import PetsDao from '../dao/Pets.dao.js';
import UserRepository from '../repository/UserRepository.js';
import PetRepository from '../repository/PetRepository.js';

const router = Router();

const userRepository = new UserRepository(new UsersDao());
const petRepository = new PetRepository(new PetsDao());

router.get('/mockingusers', (req, res) => {
	try {
		const users = generateMockUsers(50);
		res.json({ status: 'success', payload: users });
	} catch (error) {
		console.error('Error al generar usuarios:', error);
		res.status(500).json({ status: 'error', message: 'Error al generar usuarios' });
	}
});

router.post('/generateData', async (req, res) => {
	try {
		const { users = 0, pets = 0 } = req.body;

		if (isNaN(users) || isNaN(pets))
			return res.status(400).json({ status: 'error', message: 'Usuarios y mascotas deben ser números' });

		const fakeUsers = generateMockUsers(Number(users));
		const fakePets = generateMockPets(Number(pets));

		// insertar en mongo
		const createdUsers = await Promise.all(fakeUsers.map(u => userRepository.create(u)));
		const createdPets = await Promise.all(fakePets.map(p => petRepository.create(p)));

		res.json({
			status: 'success',
			message: `Se insertaron ${createdUsers.length} usuarios y ${createdPets.length} mascotas.`,
			payload: {
				users: createdUsers,
				pets: createdPets
			}
		});
	} catch (error) {
		console.error('Error generando datos:', error);
		res.status(500).json({ status: 'error', message: 'Error generando datos' });
	}
});


export default router;

