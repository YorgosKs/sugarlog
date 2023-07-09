import axios from 'axios';

export default axios.create({
  baseURL: 'https://backend-b94ud.ondigitalocean.app/api/users',
  // baseURL: 'http://127.0.0.1:5500/api/users',
  // baseURL: 'http://localhost:5500/api/users',
});
