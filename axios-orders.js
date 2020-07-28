import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-f9637.firebaseio.com'
})

export default instance;