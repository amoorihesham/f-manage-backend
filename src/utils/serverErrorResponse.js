export default function serverErrorResponse(res, error) {
  return res.status(500).json({ message: error.message, success: false, data: {} });
}
