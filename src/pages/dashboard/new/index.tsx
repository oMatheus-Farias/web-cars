import { ChangeEvent, useContext, useState } from "react";
import Container from "../../../components/container";
import PanelHeader from "../../../components/panelHeader";

import { FiUpload, FiTrash } from "react-icons/fi";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/imput";

import { AuthContext } from "../../../contexts";
import { v4 as uuidV4 } from "uuid";
import { storage, db } from "../../../services/firebaseConnection";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().nonempty('O campo nome é obrigatório'),
  model: z.string().nonempty('O modelo é obrigatório'),
  year: z.string().nonempty('O ano do carro é obrigatório'),
  km: z.string().nonempty('O KM do carro é obrigatório'),
  price: z.string().nonempty('O valor do carro é obrigatório'),
  city: z.string().nonempty('A cidade é obrigatória'),
  whatsapp: z.string().min(1, 'O telefone é obrigatório').refine((value) => /^(\d{11,12})$/.test(value), {
      message: 'Numero de telefone inválido'
  }),
  description: z.string().nonempty('A descrição é obrigatória')
});

type FormData = z.infer<typeof schema>;

interface ImageItemProps{
  uid: string | number,
  name: string,
  previewUrl: string,
  url: string
};

export default function New(){
  const { user } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  const [carImages, setCarImages] = useState<ImageItemProps[]>([]);

  function onSubmit(data: FormData){
    if(carImages.length === 0){
      toast.error('Envie pelo menos uma imagem desse carro');
      return;
  };

    const carListImages = carImages.map((car) => {
      return {
        uid: car.uid,
        name: car.name,
        url: car.url
      };
    });

    addDoc(collection(db, 'cars'), {
      name: data.name.toUpperCase(),
      model: data.model,
      year: data.year,
      km: data.km,
      price: data.price,
      city: data.city,
      whatsapp: data.whatsapp,
      description: data.description,
      created: new Date(),
      owner: user?.name,
      uid: user?.uid,
      images: carListImages
    })
    .then(() => {
      reset();
      setCarImages([]);
      toast.success('Cadastrado com sucesso');
    })
    .catch((error) => {
      console.log('Erro ao enviar formulário', error);
    });
  };

  async function handleFile(event: ChangeEvent<HTMLInputElement>){
    if(event.target.files && event.target.files[0]){
      const image = event.target.files[0];

      if(image.type === 'image/jpeg' || image.type === 'image/png'){
        await handleUpload(image);
      }else{
        alert('Envie uma imagem do tipo JPEG ou PNG');
        return;
      };
    };
  };

  async function handleUpload(image: File){
    if(!user?.uid){
      return;
    };

    const currentUid = user?.uid;
    const uidImage = uuidV4();

    const uploadRef = ref(storage, `image/${currentUid}/${uidImage}`);

    uploadBytes(uploadRef, image)
    .then((snapshot) => {
      getDownloadURL(snapshot.ref).then((dowloadUrl) => {
        const imageItem = {
          uid: currentUid,
          name: uidImage,
          previewUrl: URL.createObjectURL(image),
          url: dowloadUrl
        };

        setCarImages((images) => [...images, imageItem]);
      })
    })
    .catch((error) => {
      console.log('Erro ao salvar imagem', error);
    });
  };

  async function handleDeleteImage(item: ImageItemProps){
    const imagePath = `image/${item.uid}/${item.name}`;
    const imageRef = ref(storage, imagePath);

    await deleteObject(imageRef)
    .then(() => {
      setCarImages(carImages.filter((car) => {
        return car.url !== item.url;
      }));
    })
    .catch((error) => {
      console.log('Erro ao deletar imagem', error);
    });
  };

    return(
      <Container>
        <PanelHeader/>

        <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2" >
          <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48" >
            <div className="absolute cursor-pointer" >
              <FiUpload size={30} color='#000' />
            </div>
            <div className="cursor-pointer" >
              <input 
                type="file" 
                accept="image/*" 
                className="opacity-0 cursor-pointer" 
                onChange={ handleFile }
              />
            </div>
          </button>

            { carImages.map((item) => {
              return (
                <div key={ item.name } className="w-full h-32 flex items-center justify-center relative" >
                  <button className='absolute' onClick={() => handleDeleteImage(item)} >
                    <FiTrash size={28} color='#FFF' />
                  </button>
                  <img
                    src={ item.previewUrl }
                    alt="Foto do carro"
                    className="rounded-lg w-full h-32 object-cover"
                  />
                </div>
              )
            }) }
        </div>

        <div className="w-full bg-white p-3 rounded-lg flex fle-col sm:flex-row items-center gap-2 mt-2" >
          <form
            className="w-full"
            onSubmit={ handleSubmit(onSubmit) }
          >
            <div className="mb-3" >
              <p className="mb-2 font-medium" >Nome do carro</p>
              <Input
                type='text'
                register={ register } 
                name='name'
                error={ errors.name?.message }
                placeholder="Ex: Onix 1.0..."
              />
            </div>

              <div className="mb-3" >
                <p className="mb-2 font-medium" >Modelo do carro</p>
                <Input
                  type='text'
                  register={ register } 
                  name='model'
                  error={ errors.model?.message }
                  placeholder="Ex: 1.0 flex PLUS MANUAL..."
                />
              </div>

              <div className="flex w-full mb-3 flex-row items-center gap-4" >
                <div className="w-full" >
                  <p className="mb-2 font-medium" >Ano do carro</p>
                  <Input
                    type='text'
                    register={ register } 
                    name='year'
                    error={ errors.year?.message }
                    placeholder="Ex: 2023/2023"
                  />
                </div>

                <div className="w-full" >
                  <p className="mb-2 font-medium" >KM rodados</p>
                  <Input
                    type='text'
                    register={ register } 
                    name='km'
                    error={ errors.km?.message }
                    placeholder="Ex: 120.000"
                  />
                </div>
              </div>

              <div className="flex w-full mb-3 flex-row items-center gap-4" >
                <div className="w-full" >
                  <p className="mb-2 font-medium" >Telefone / Whatsapp</p>
                  <Input
                    type='text'
                    register={ register } 
                    name='whatsapp'
                    error={ errors.whatsapp?.message }
                    placeholder="Ex: 11932321000"
                  />
                </div>

                <div className="w-full" >
                  <p className="mb-2 font-medium" >Cidade</p>
                  <Input
                    type='text'
                    register={ register } 
                    name='city'
                    error={ errors.city?.message }
                    placeholder="Ex: Guarulhos - SP"
                  />
                </div>
              </div>

              <div className="mb-3" >
                <p className="mb-2 font-medium" >Preço</p>
                <Input
                  type='text'
                  register={ register } 
                  name='price'
                  error={ errors.price?.message }
                  placeholder="Ex: 90.000"
                />
              </div>

              <div className="mb-3" >
                <p className="mb-2 font-medium" >Descrição</p>
                <textarea
                  className="border-2 w-full rounded-md h-24 px-2"
                  { ...register('description') }
                  name="description"
                  id="description"
                  placeholder="Digite a descrição completa sobre o carro..."
                />
                { errors.description && <p className="mb-1 text-red-500" >{ errors.description?.message }</p> }
              </div>

              <button type="submit" className="rounded-md bg-zinc-900 text-white font-medium w-full h-10" >
                Cadastrar
              </button>
          </form>
        </div>
      </Container>
    );
};