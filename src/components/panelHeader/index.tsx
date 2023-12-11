import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { Link } from "react-router-dom";

import { toast } from "react-hot-toast";

export default function PanelHeader(){
  async function handleLogout(){
    await signOut(auth)
    .then(() => {
      toast.success('Volte sempre');
    })
    .catch((error) => {
      console.log('Erro ao sair da conta ', error);
    });
  };

  return(
    <div className="flex w-full items-center h-10 bg-red-500 rounded-lg text-white font-medium gap-4 px-4 mb-4" >
      <Link to='/dashboard' >
        Dashboard
      </Link>

      <Link to='/dashboard/new' >
        Cadastrar carro
      </Link>

      <button onClick={ handleLogout }  className="ml-auto" >
        Sair da conta
      </button>
    </div>
  );
};