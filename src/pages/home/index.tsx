import Header from "../../components/header";
import Container from "../../components/container";

export default function Home() {
  return (
    <div>
      <Header/>

      <Container>
        <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2" >
          <input 
            placeholder="Digite o nome do carro"
            className="w-full border-2 rounded-lg h-9 px-3 outline-none"
          />

          <button 
            className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg" 
          >   
            Buscar
          </button>
        </section>

        <h1 className="font-bold text-center mt-6 text-2xl mb-4" >
          Carros novos e usados em todo o Brasil
        </h1>

        <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" >
          <section className="w-full bg-white rounded-lg" >
            <img
              className="w-full rounded-lg mb-2 max-h-72 object-cover"
              src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2023/202309/20230913/chevrolet-camaro-6.2-v8-gasolina-ss-automatico-wmimagem11340738380.jpg?s=fill&w=1920&h=1440&q=75"
              alt="Carro"
            />
            <p className="font-bold mt-1 mb-2 px-2 uppercase" >CAMARO</p>

            <div className="flex flex-col px-2" >
              <p className="text-zinc-700 mb-6" >Ano 2023/2023 | 20.000 KM</p>
              <p className="font-medium text-black text-xl" >R$ 200.000</p>
            </div>

            <div className="w-full h-px bg-slate-200 my-2" ></div>

            <div className="px-2 pb-2" >
              <p className="text-black" >
                São Paulo - SP
              </p>
            </div>
          </section>
        </main>
      </Container>
    </div>
  );
};