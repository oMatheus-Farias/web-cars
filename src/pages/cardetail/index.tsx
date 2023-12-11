import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '../../components/container';
import { FaWhatsapp } from "react-icons/fa";

import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';

import { Swiper, SwiperSlide } from 'swiper/react';

interface CarProps {
  id: string,
  name: string,
  year: string,
  price: string | number,
  city: string,
  km: string,
  model: string,
  uid: string,
  created: string,
  owner: string,
  description: string,
  whatsapp: string,
  images: ImageCarProps[]
}

interface ImageCarProps {
  uid: string,
  name: string,
  url: string
}

export default function CarDetail(){
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState<CarProps>();
  const [sliderPerView, setSliderPerView] = useState<number>(2);
  
  useEffect(() => {
    async function loadCar(){
      if(!id) return;

      const docRef = doc(db, "cars", id);
      getDoc(docRef)
      .then((snapshot) => {
        if(!snapshot.data()){
          navigate('/');
        };

        setCar({
          id: snapshot.id,
          name: snapshot.data()?.name,
          city: snapshot.data()?.city,
          created: snapshot.data()?.created,
          description: snapshot.data()?.description,
          km: snapshot.data()?.km,
          model: snapshot.data()?.model,
          owner: snapshot.data()?.owner,
          price: snapshot.data()?.price,
          uid: snapshot.data()?.uid,
          whatsapp: snapshot.data()?.whatsapp,
          year: snapshot.data()?.year,
          images: snapshot.data()?.images
        });
      })
      .catch((error) => {
        console.log('Erro ao buscar carro', error);
      });
    };

    loadCar();
  }, [id]);

  useEffect(() => {
    function handleResize(){
      if(window.innerWidth < 720){
        setSliderPerView(1);
      }else{
        setSliderPerView(2);
      };
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return(
    <Container>
      { car && (
        <Swiper
          slidesPerView={ sliderPerView }
          pagination={{ clickable: true }}
          navigation
        >
          { car?.images.map((image) => (
            <SwiperSlide key={ image.name } >
              <img
                src={ image.url }
                className='w-full h-96 object-cover'
              />
            </SwiperSlide>
          )) }
        </Swiper>
      ) }

      { car && (
        <main className='w-full bg-white rounded-lg p-6 my-4' >
          <div className='flex flex-col sm:flex-row mb-4 items-center justify-between' >  
            <h1 className='font-bold text-3xl text-black' >{ car?.name }</h1>
            <h1 className='font-bold text-3xl text-black' >R$ { car?.price }</h1>
          </div>
          <p>{ car?.model }</p>

          <div className='flex w-full gap-6 my-4' >
            <div className='flex flex-col gap-4' >
              <div>
                <p>Cidade</p>
                <strong>{ car?.city }</strong>
              </div>
              <div>
                <p>Ano</p>
                <strong>{ car?.year }</strong>
              </div>
            </div>

            <div className='flex flex-col gap-4' >
              <div>
                <p>KM</p>
                <strong>{ car?.km }</strong>
              </div>
            </div>
          </div>

          <strong>Descrição:</strong>
          <p className='mb-4' >{ car?.description }</p>

          <strong>Telefone / Whatsapp</strong>
          <p className='mb-4' >{ car?.whatsapp }</p>

          <a
            href={ `https://api.whatsapp.com/send?phone=${car?.whatsapp}&text=Olá, vi esse ${car?.name} no site WebCarros e fiquei interessado` }
            target='_blank'
            className='bg-green-500 w-full text-white flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium cursor-pointer'
          >
            Conversar com vendedor
            <FaWhatsapp size={26}  color='#FFF' />
          </a>
        </main>
      ) }
    </Container>
  );
};