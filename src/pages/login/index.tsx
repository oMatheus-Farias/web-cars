import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts";

import logoImg from "../../assets/logo.svg";
import Container from "../../components/container";
import Input from "../../components/imput";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-hot-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email('Digite um email válido').nonempty('O campo email é obrigatório'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres').nonempty('O campo senha é obrigatório')
});

type FormData = z.infer<typeof schema>

export default function Login() {
	const { handleInfoUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  });

	useEffect(() => {
		async function handleSignOut(){
			await signOut(auth);
		};

		handleSignOut();
	}, [])

  async function onSubmit(data: FormData){
    await signInWithEmailAndPassword(auth, data.email, data.password)
    .then((user) => {
			
			handleInfoUser({
				uid: user.user.uid,
				name: user.user.displayName,
				email: data.email
			});

      navigate('/dashboard', { replace: true });
      toast.success('Bem-vindo(a)');
      reset();
    })
    .catch((error) => {
      console.log("Erro ao fazer login", error);
    });
  };

  return (
    <Container>
			<div className="w-full justify-center items-center flex flex-col min-h-screen gap-4" >
				<Link to='/' className="mb-6 max-w-sm w-full" >
					<img
					className="w-full"
						src={ logoImg }
						alt="Logo do site"
					/>
				</Link>

        <form className="bg-white max-w-xl w-full rounded-lg p-4" onSubmit={ handleSubmit(onSubmit) } >
					<div className="mb-3" >
						<Input
							type='email'
							placeholder='Digite seu email...'
							name='email'
							error={ errors.email?.message }
							register={ register }
						/>
					</div>

					<div className="mb-3" >
						<Input
							type='password'
							placeholder='Digite sua senha...'
							name='password'
							error={ errors.password?.message }
							register={ register }
						/>
					</div>

					<button  type="submit" className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium" >Acessar</button>
				</form>

				<Link to='/register' >Ainda não possui uma conta? Cadastre-se</Link>
			</div>
		</Container>
  );
};