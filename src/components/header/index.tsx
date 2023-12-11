import { useContext } from "react";
import logoImg from "../../assets/logo.svg";
import { FiUser, FiLogIn } from "react-icons/fi";

import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts";

export default function Header(){
  const { signed } = useContext(AuthContext);

  return(
    <div className="w-full flex items-center justify-center h-16 bg-white drop-shadow mb-4" >
      <header className="flex w-full max-w-7xl items-center justify-between px-4 mx-auto" >
        <Link to='/' >
          <img
            src={ logoImg }
            alt="Imagem da Logo"
          />
        </Link>
        
        <Link to={ signed ? '/dashboard' : '/login' } >
          { signed ? (
            <div className="border-2 rounded-full p-1 border-gray-900" >
              <FiUser size={24} color="#000" />
            </div>
          ) : (
            <div className="border-2 rounded-full p-1 border-gray-900" >
              <FiLogIn size={24} color="#000" />
            </div>
          ) }
        </Link>
      </header>
    </div>
  );
};