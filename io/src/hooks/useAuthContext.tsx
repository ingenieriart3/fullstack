// import { useState } from 'react';
import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from 'react';
import { signUp, signIn, signOut } from '../services/auth-service';
// import { signUp, signIn, signOut } from '../services/auth';
// import { useProvideAuth } from '../hooks/useAuth';
import { Route, Navigate } from 'react-router-dom';

interface AuthContextValue {
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}

export const auth = {
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

// const authContext = createContext(auth);
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

let _initial_value: string | undefined = '';
// export const AuthProvider: React.FC = ({ children }) => {
export const AuthProvider: any = ({ children }) => {
  // Set initial value
  // const _initial_value: string | undefined = useMemo(() => {
  _initial_value = useMemo(() => {
    const local_storage_value_str = localStorage.getItem('state:');
    // If there is a value stored in localStorage, use that
    if (local_storage_value_str) {
      return JSON.parse(local_storage_value_str);
    }
    // Otherwise use initial_value that was passed to the function
    return _initial_value;
  }, []);
  const [username, setUsername] = useState<string | null>(_initial_value);
  // const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const username_str = JSON.stringify(username); // Stringified state
    localStorage.setItem('state:', username_str); // Set stringified username as item in localStorage
  }, [username]);

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const authContext = React.useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error('useAuthContext must be inside a AuthProvider');
  }
  return authContext;
};

// const authContext = createContext();

// // Hook for child components to get the auth object ...
// // ... and re-render when it changes.
// export const useAuth = () => {
//   const [user, setUser] = useState('');
//   return useContext(authContext);
// };

// // Provider component that wraps your app and makes auth object ...
// // ... available to any child component that calls useAuth().
// export const AppProvider = ({ children }) => {
//   const auth = useProvideAuth();
//   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
// };

// // A wrapper for <Route> that redirects to the login
// // screen if you're not yet authenticated.
// export const PrivateRoute = ({ children, ...rest }) => {
//   let auth = useAuth();
//   console.log('holaaaaaaaaaaaaaaa');
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         auth.user ? (
//           children
//         ) : (
//           //   <Redirect
//           //     to={{
//           //       pathname: '/login',
//           //       state: { from: location },
//           //     }}
//           //   />
//           <Navigate to="/auth/signin"></Navigate>
//         )
//       }
//     />
//   );
// };

// const auth = {
//   isAuthenticated: false,
//   signup(credentials, cb) {
//     auth.isAuthenticated = true;
//     signUp(credentials, cb);
//   },
//   signin(credentials, cb) {
//     auth.isAuthenticated = true;
//     signIn(credentials, cb);
//   },
//   signout(cb) {
//     auth.isAuthenticated = false;
//     signOut(cb);
//   },
// };

// export const useProvideAuth = () => {
//   const [user, setUser] = useState(null);

//   const signup = (credentials, cb) => {
//     return auth.signup(credentials, (body, JWR) => {
//       if (body === 'OK') {
//         localStorage.setItem('user', credentials.emailAddress);
//         setUser('user');
//       } else {
//         localStorage.setItem('user', null);
//       }
//       cb(body, JWR);
//     });
//   };

//   const signin = (credentials, cb) => {
//     return auth.signin(credentials, (body, JWR) => {
//       if (body === 'OK') {
//         localStorage.setItem('user', credentials.email);
//         setUser('user');
//       } else {
//         localStorage.setItem('user', null);
//       }
//       cb(body, JWR);
//     });
//   };

//   const signout = (cb) => {
//     return auth.signout(() => {
//       localStorage.removeItem('user'); // .setItem('user', null);
//       setUser(null);
//       cb();
//     });
//   };

//   return {
//     user,
//     signup,
//     signin,
//     signout,
//   };
// };
