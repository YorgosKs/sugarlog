import { useState, useContext, createContext } from 'react';

const authContext = createContext();

function UseAuth() {
  const [authed, setAuthed] = useState(false);

  return {
    authed,
    login() {
      return new Promise((res) => {
        setAuthed(true);
        console.log(setAuthed);
        res();
      });
    },
    logout(set) {
      return new Promise((res) => {
        setAuthed(set);
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = UseAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return useContext(authContext);
}
