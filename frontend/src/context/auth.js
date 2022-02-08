import useAuth from 'hooks/useAuth';
import * as React from 'react';

const authContext = React.createContext();

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
