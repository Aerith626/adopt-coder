import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.URI_MONGODB);

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
});
