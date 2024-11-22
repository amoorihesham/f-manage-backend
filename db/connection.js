import { connect } from 'mongoose';
import config from '../src/libs/configuration.js';

const dbConnect = async () => {
  await connect(process.env.MONGO_URI)
    .then(() => console.log('Database connection established'))
    .catch((err) => console.log('Error connecting to Database: ', err));
};

export default dbConnect;
