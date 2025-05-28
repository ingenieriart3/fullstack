import { useState } from 'react';
import { signUp, signIn, signOut } from '../services/auth-service';

const auth = {
  isAuthenticated: false,
  signup(credentials, cb) {
    auth.isAuthenticated = true;
    signUp(credentials, cb);
  },
  signin(credentials, cb) {
    auth.isAuthenticated = true;
    signIn(credentials, cb);
  },
  signout(cb) {
    auth.isAuthenticated = false;
    signOut(cb);
  },
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const signup = (credentials, cb) => {
    return auth.signup(credentials, (body, JWR) => {
      if (body === 'OK') {
        localStorage.setItem('user', credentials.emailAddress);
        setUser('user');
      } else {
        localStorage.setItem('user', null);
      }
      cb(body, JWR);
    });
  };

  const signin = (credentials, cb) => {
    return auth.signin(credentials, (body, JWR) => {
      if (body === 'OK') {
        localStorage.setItem('user', credentials.email);
        setUser('user');
      } else {
        localStorage.setItem('user', null);
      }
      cb(body, JWR);
    });
  };

  const signout = (cb) => {
    return auth.signout(() => {
      localStorage.removeItem('user'); // .setItem('user', null);
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signup,
    signin,
    signout,
  };
};
