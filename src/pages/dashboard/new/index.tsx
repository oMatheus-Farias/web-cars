import Header from "../../../components/header";
import Container from "../../../components/container";
import PanelHeader from "../../../components/panelHeader";
import Input from "../../../components/imput";

import { FiUpload } from "react-icons/fi";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

export default function New() {
  const { register, reset, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  });

  function onSubmit(data: FormData){
    console.log(data);
  };

  return (
    <div>
      <Header/>

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
              />
            </div>
          </button>
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
    </div> 
  );
};