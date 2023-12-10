import { ReactNode, createContext, useState } from "react";

type AuthContextData = {
  signed: boolean,
  user: UserProps | null
};

interface UserProps {
  id: string | number,
  name: string,
  email: string
};

export const AuthContext = createContext({} as AuthContextData );

export default function AuthProvider({ children }: { children: ReactNode }){
  const [user, setUser] = useState<UserProps | null>(null);

  return(
    <AuthContext.Provider value={{  signed: !!user, user  }} >
      { children }
    </AuthContext.Provider>
  );
};