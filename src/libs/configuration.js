const config = {
  jwtSecret: process.env.JWT_SECRET,
  dbURL: process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : 'mongodb://localhost:27017/fmanage',
  dbConnection: process.env.NODE_ENV === 'production' ? 'Mongo Atlas' : 'Local Connection',
  crossOrigin: 'http://localhost:5173',
  port: process.env.PORT || 3000,
};

export default config;
