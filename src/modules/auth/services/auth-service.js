import axios from 'axios';

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: 'http://localhost:3001/auth',
      withCredentials: true,
    });
  }

  signup(user) {
    return this.auth.post('/signup', user)
      .then(({ data }) => data)
      .catch((error) => { console.log('Error signing up', error); });
  }

  login(user) {
    console.log('log in');
    return this.auth.post('/login', user)
      .then(({ data }) => data)
      .catch((error) => { console.log('Error logging in', error); });
  }
}

const auth = new Auth();

export default auth;
