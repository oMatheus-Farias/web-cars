import { ReactNode, createContext, useState } from "react";

type AuthContextData = {
  signed: boolean,
  user: UserProps | null
  handleInfoUser: ({ uid, name, email }: UserProps) => void;
};

interface UserProps {
  uid: string | number,
  name: string,
  email: string
};

export const AuthContext = createContext({} as AuthContextData );

export default function AuthProvider({ children }: { children: ReactNode }){
  const [user, setUser] = useState<UserProps | null>(null);

  function handleInfoUser({ uid, name, email }: UserProps){
    setUser({
      uid: uid,
      name: name,
      email: email
    });
  };

  return(
    <AuthContext.Provider value={{  signed: !!user, user, handleInfoUser  }} >
      { children }
    </AuthContext.Provider>
  );
};