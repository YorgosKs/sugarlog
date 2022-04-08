import axios from 'axios';

export default axios.create({
  // baseURL: 'http://localhost:5500/api/users',
  baseURL: 'https://backend2-kgr8s.ondigitalocean.app/api/users',
});
