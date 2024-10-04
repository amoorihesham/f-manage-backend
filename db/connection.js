import mongoose from 'mongoose';

const dbConnect = async () => {
  await mongoose
    .connect('mongodb://localhost:27017/fmanage')
    .then(() => console.log('Database connection established'))
    .catch((err) => console.log('Error connecting to Database: ', err));
};

export default dbConnect;
