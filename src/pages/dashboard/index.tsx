import { useEffect, useContext, useState } from "react";

import Container from "../../components/container";
import Header from "../../components/header";
import PanelHeader from "../../components/panelHeader";

import { collection, where, query, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../../services/firebaseConnection";
import { ref, deleteObject } from "firebase/storage";

import { AuthContext } from "../../contexts";

import { FiTrash2 } from "react-icons/fi";

interface CarProps {
  id: string,
  name: string,
  year: string,
  price: string | number,
  city: string,
  km: string,
  model: string,
  uid: string,
  images: ImageCar[]
};

interface ImageCar {
  uid: string,
  name: string,
  url: string
}

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const [cars, setCars] = useState<CarProps[]>([]);

  useEffect(() => {
    function loadCars(){
      if(!user?.uid){
        return;
      };

      const carsRef = collection(db, 'cars');
      const queryRef = query(carsRef, where('uid', '==', user.uid));

      getDocs(queryRef)
      .then((snapshot) => {
        let listCars = [] as CarProps[];

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

    loadCars();
  }, [user]);

  async function handleDeleteCar(car: CarProps){
    const docRef = doc(db, "cars", car.id);
    await deleteDoc(docRef)

    car.images.map(async (image) => {
      const imagePath = `image/${image.uid}/${image.name}`;
      const imageRef = ref(storage, imagePath);
        
      try{
        await deleteObject(imageRef);
        setCars(cars.filter((item) => item.id !== car.id));
      }catch(error){
        console.log('Erro ao deletar imagens', error);
      };
    });
  };

  return (
    <div>
      <Header/>

      <Container>
        <PanelHeader/>

        <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" >
          { cars.map((item) => {
            return(
              <section 
                key={ item.id }
                className="w-full bg-white rounded-lg relative" >
                <button 
                  onClick={ () => handleDeleteCar(item) }
                  className="absolute bg-white rounded-full w-10 h-10 justify-center items-center flex right-2 top-2 drop-shadow" >
                  <FiTrash2 size={20} color='#000' />
                </button>
                <img
                  className="w-full mb-2 rounded-lg max-h-72 object-cover"
                  src={ item.images[0].url }
                />
                <p className="font-bold mt-1 px-2 mb-2" >{ item.name }</p>

                <div className="flex flex-col px-2" >
                  <span className="text-zinc-700" >
                    Ano { item.year } | { item.km }
                  </span>
                  <strong className="text-black font-bold mt-4" >
                    R$ { item.price }
                  </strong>
                </div>

                <div className="w-full h-px bg-slate-200 my-2" ></div>
                <div className="px-2 pb-2" >
                  <span className="text-black" >
                    { item.city }
                  </span>
                </div>
              </section>
            )
          }) }
        </main>
      </Container>
    </div>
  );
};