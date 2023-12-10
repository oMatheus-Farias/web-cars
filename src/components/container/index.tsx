import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }){
  <div className="w-full max-w-7xl px-4" >
    { children }
  </div>
};