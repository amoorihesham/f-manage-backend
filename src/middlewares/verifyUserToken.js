export default function verifyUserToken(req, res, next) {
  console.log('hi Middleware')
  return next()
}
