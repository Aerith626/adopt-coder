import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';

const expect = chai.expect;
const requester = supertest(app);

describe('Adoption Router Tests', () => {

	before(async () => {
		await mongoose.connect(process.env.URI_MONGODB);
	});

	after(async () => {
		await mongoose.disconnect();
	});

	describe('GET /api/adoptions', () => {
		it('debe devolver todas las adopciones', async () => {
			const res = await requester.get('/api/adoptions');
			expect(res.status).to.equal(200);
			expect(res.body.status).to.equal('success');
			expect(res.body.payload).to.be.an('array');
		});
	});

	describe('GET /api/adoptions/:aid', () => {
		it('debe devolver 404 si la adopción no existe', async () => {
			const fakeId = '671234567812345678123456';
			const res = await requester.get(`/api/adoptions/${fakeId}`);
			expect(res.status).to.equal(404);
			expect(res.body.error).to.equal('Adoption not found');
		});

		it('debe devolver una adopción existente', async () => {
			const user = await requester.post('/api/users').send({
				first_name: "Test",
				last_name: "User",
				email: `test${Date.now()}@mail.com`,
				password: "123456",
				pets: []
			});
			const pet = await requester.post('/api/pets').send({
				name: "Firulais",
				specie: "dog",
				birthDate: "2020-01-01"
			});

			const adoption = await requester.post(`/api/adoptions/${user.body.payload._id}/${pet.body.payload._id}`);

			const res = await requester.get(`/api/adoptions/${adoption.body.payload?._id || '???'}`);

			expect(res.status).to.equal(200);
			expect(res.body.status).to.equal('success');
			expect(res.body.payload).to.be.an('object');
		});
	});

	describe('POST /api/adoptions/:uid/:pid', () => {

		it('debe devolver 404 si el usuario no existe', async () => {
			const res = await requester.post('/api/adoptions/671234567812345678123456/671234567812345678123456');
			expect(res.status).to.equal(404);
			expect(res.body.error).to.equal('user Not found');
		});

		it('debe devolver 404 si la mascota no existe', async () => {
			const user = await requester.post('/api/users').send({
				first_name: 'UserX',
				last_name: 'Test',
				email: `test${Date.now()}@mail.com`,
				password: '123',
				pets: []
			});

			const res = await requester.post(`/api/adoptions/${user.body.payload._id}/671234567812345678123456`);
			expect(res.status).to.equal(404);
			expect(res.body.error).to.equal('Pet not found');
		});

		it('debe devolver 400 si la mascota ya está adoptada', async () => {
			const user = await requester.post('/api/users').send({
				first_name: 'UserY',
				last_name: 'Test',
				email: `test${Date.now()}@mail.com`,
				password: '123',
				pets: []
			});
			const pet = await requester.post('/api/pets').send({ 
				name: 'Misifus', specie: 'cat', 
				birthDate: "2021-02-01", 
				adopted: true 
			});
			const res = await requester.post(`/api/adoptions/${user.body.payload._id}/${pet.body.payload._id}`);
			expect(res.status).to.equal(400);
			expect(res.body.error).to.equal('Pet is already adopted');
		});

		it('debe permitir adoptar una mascota correctamente', async () => {
			const user = await requester.post('/api/users').send({
				first_name: 'UserZ',
				last_name: 'Test',
				email: `test${Date.now()}@mail.com`,
				password: '123',
				pets: []
			});
			const pet = await requester.post('/api/pets').send({ 
				name: 'La que te engaña', 
				specie: 'spider', 
				birthDate: "2024-02-01", 
				adopted: false 
			});

			const res = await requester.post(`/api/adoptions/${user.body.payload._id}/${pet.body.payload._id}`);

			expect(res.status).to.equal(200);
			expect(res.body.status).to.equal('success');
			expect(res.body.message).to.equal('Pet adopted');
		});
	});
});
