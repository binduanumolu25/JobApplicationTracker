export const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-backend-url.herokuapp.com'
  : 'http://localhost:5000';