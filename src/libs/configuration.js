const config = {
  jwtSecret: process.env.JWT_SECRET,
  dbURL: process.env.MONGO_URI,
  dbConnection: process.env.NODE_ENV === 'production' ? 'Mongo Atlas' : 'Local Connection',
  crossOrigin: 'http://localhost:5173',
  port: process.env.PORT || 3000,
};

export default config;
