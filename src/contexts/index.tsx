import { ReactNode, createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConnection";

type AuthContextData = {
  signed: boolean,
  user: UserProps | null
  handleInfoUser: ({ uid, name, email }: UserProps) => void;
};

interface UserProps {
  uid: string | number,
  name: string | null,
  email: string | null
};

export const AuthContext = createContext({} as AuthContextData );

export default function AuthProvider({ children }: { children: ReactNode }){
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => {
        if(user){
          setUser({
            uid: user.uid,
            name: user?.displayName,
            email: user?.email
          });
        }else{
          setUser(null);
        };
      });

    return () => {
      unsub();
    };
  }, []);

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