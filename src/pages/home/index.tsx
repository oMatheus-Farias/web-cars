import { useState, useEffect } from "react";
import Header from "../../components/header";
import Container from "../../components/container";

import { Link } from "react-router-dom";

import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface CarsProps {
  id: string,
  name: string,
  model: string,
  year: string,
  uid: string,
  km: string,
  price: string | number,
  city: string,
  images: CarImageProps[],
};

interface CarImageProps {
  name: string,
  uid: string,
  url: string,
};

export default function Home() {
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loadImages, setLoadsImages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    loadCars();
  }, []);

  function loadCars(){
    const carsRef = collection(db, 'cars');
    const queryRef = query(carsRef, orderBy('created', 'desc'));

    getDocs(queryRef)
    .then((snapshot) => {
      let listCars = [] as CarsProps[];

      snapshot.forEach((doc) => {
        listCars.push({
          id: doc.id,
          name: doc.data().name,
          model: doc.data().model,
          year: doc.data().year,
          km: doc.data().km,
          price: doc.data().price,
          city: doc.data().city,
          images: doc.data().images,
          uid: doc.data().uid
        });
      });

      setCars(listCars);
    })
    .catch((error) => {
      console.log('Erro ao buscar lista de carros', error);
    });
  };

  function handleImageLoad(id: string){
    setLoadsImages((prevImageLoaded) => [...prevImageLoaded, id]);
  };

  async function handleSearchCar(){
    if(input === ''){
      loadCars();
      return;
    };

    setCars([]);
    setLoadsImages([]);

    const q = query(collection(db, 'cars'), where('name', '>=', input.toUpperCase()), where('name', '<=', input.toUpperCase() + '\uf8ff'));

    const querySnapshot = getDocs(q);

    let listCars = [] as CarsProps[];

    (await querySnapshot).forEach((doc) => {
      listCars.push({
        id: doc.id,
        name: doc.data().name,
        model: doc.data().model,
        year: doc.data().year,
        km: doc.data().km,
        price: doc.data().price,
        city: doc.data().city,
        images: doc.data().images,
        uid: doc.data().uid
      });
    });

    setCars(listCars);
  };

  return (
    <div>
      <Header/>

      <Container>
        <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2" >
          <input 
            placeholder="Digite o nome do carro"
            className="w-full border-2 rounded-lg h-9 px-3 outline-none"
            value={ input }
            onChange={ (event) => setInput(event.target.value) }
          />

          <button 
            className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg" 
            onClick={ handleSearchCar }
          >   
            Buscar
          </button>
        </section>

        <h1 className="font-bold text-center mt-6 text-2xl mb-4" >
          Carros novos e usados em todo o Brasil
        </h1>

        <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" >
          { cars.map((car) => {
            return(
              <Link key={ car.id } to={ `/cardetail/${car.id}` } >
                <section className="w-full bg-white rounded-lg" >
                  <div 
                    className="w-full rounded-lg h-72 bg-slate-200" 
                    style={{ display: loadImages.includes(car.id) ? 'none' : 'block' }}
                  >
                  </div>
                  <img
                    className="w-full rounded-lg mb-2 max-h-72 object-cover"
                    style={{ display: loadImages.includes(car.id) ? 'block' : 'none' }}
                    src={ car.images[0].url }
                    alt="Carro"
                    onLoad={ () => handleImageLoad(car.id) }
                  />
                  <p className="font-bold mt-1 mb-2 px-2" >{ car.name }</p>

                  <div className="flex flex-col px-2" >
                    <span className="text-zinc-700 mb-6" >{ `Ano ${car.year} | KM ${car.km}` }</span>
                    <strong className="text-black font-medium text-xl" >R$ { car.price }</strong>
                  </div>

                  <div className="w-full h-px bg-slate-200 my-2" ></div>

                  <div className="px-2 pb-2" >
                    <span className="text-black" >{ car.city }</span>
                  </div>
                </section>
              </Link>
            )
          }) }
        </main>
      </Container>
    </div>
  );
};