import bcrypt from 'bcrypt';
export default async function verifyPassword(reqPassword, dbPassword) {
  return await bcrypt.compare(reqPassword, dbPassword);
}
