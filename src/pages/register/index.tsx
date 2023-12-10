import Container from "../../components/container";
import Input from "../../components/imput";
import logoImg from "../../assets/logo.svg";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { auth } from "../../services/firebaseConnection";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";

const schema = z.object({
  name: z.string().nonempty('O campo nome é obrigatório'),
  email: z.string().email('Digite um email válido').nonempty('O campo email é obrigatório'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres').nonempty('O campo senha é obrigatório')
});

type FormData = z.infer<typeof schema>;

export default function Register() {
	const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  });

  async function onSubmit(data: FormData){
    await createUserWithEmailAndPassword(auth, data.email, data.password)
		.then(async (user) => {
			await updateProfile(user.user, {
				displayName: data.name
			});

			toast.success('Cadastrado com sucesso');
			navigate('/dashboard', { replace: true });
			reset();
		})
		.catch((error) => {
			console.log('Erro ao cadastrar usuário', error);
			toast.error('Ocorreu um erro ao tentar cadastrar');
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
							type='text'
							placeholder='Digite seu nome completo...'
							name='name'
							error={ errors.name?.message }
							register={ register }
						/>
					</div>

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

					<button  type="submit" className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium" >Cadastrar</button>
				</form>

        <Link to='/login' >Já possui uma conta? Faça login</Link>
			</div>
		</Container>
  );
};