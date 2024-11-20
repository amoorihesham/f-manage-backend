import { connect } from 'mongoose';
import config from '../src/libs/configuration.js';

const dbConnect = async () => {
  await connect('mongodb+srv://amrheshammacc:medicadb@medica.s1d3y.mongodb.net/?retryWrites=true&w=majority&appName=medica')
    .then(() => console.log('Database connection established'))
    .catch((err) => console.log('Error connecting to Database: ', err));
};

export default dbConnect;
