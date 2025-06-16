import { connect } from 'mongoose';

const dbConnect = async () => {
  await connect(process.env.MONGO_URI)
    .then(() => console.log(`\n  Database connection established`))
    .catch((err) => console.log(`\nError connecting to Database: ${err}`));
};

export default dbConnect;
