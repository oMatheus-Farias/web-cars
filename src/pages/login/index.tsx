import logoImg from "../../assets/logo.svg";
import Container from "../../components/container";

import { Link } from "react-router-dom";

export default function Login() {
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
			</div>
		</Container>
  );
};