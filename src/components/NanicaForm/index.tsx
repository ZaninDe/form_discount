"use client"; // This is a client component 👈🏽
import { useState } from "react"
import { TailSpin } from 'react-loader-spinner'
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';

type FormProps = {
  tab1: string,
  tab2: string,
}

type Inputs = {
  name: string,
  email: string,
  cpf: string,
  address: string,
};

const schema = yup.object({
  name: yup.string().required('campo obrigatório').nullable(),
  email: yup.string().email('digite um e-mail válido').required('campo obrigatório'),
  cpf: yup.string().min(11, "Digite um CPF válido").required('campo obrigatório'),
  address: yup.string().required('campo obrigatório')
});

export function NanicaForm({ tab1, tab2 }: FormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = async ({ name, email, cpf, address }: Inputs) => {
    setIsSubmiting(true)
    console.log(errors)
    try {
      const response = await fetch(tab1, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify([[name, email, cpf, new Date().toLocaleDateString('pt-BR')]])
      })
      await response.json()
      setIsSuccess(true)
    } catch (err) {
      console.log(err)
    } finally {
      reset();
      setIsSubmiting(false)
    }

    try {
      const response = await fetch(tab2, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify([[name, email, cpf, address, new Date().toLocaleDateString('pt-BR')]])
      })
      await response.json()
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <main className="h-screen w-screen flex flex-col md:flex-row overflow-hidden">
      <div className="md:h-screen h-1/4 w-screen md:w-1/2 bg-[#823811] flex items-center justify-center">
        <div className="md:w-[80%] md:h-[40%] w-[90%] h-[60%] bg-no-repeat bg-center bg-contain bg-hero-nanica"></div>
      </div>
      <div className="md:h-screen h-3/4 w-screen md:w-1/2 bg-zinc-50 flex items-center justify-center">
        {
          !isSuccess ?
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2 w-full max-w-xs mt-[-10%]"
            >
              <div className="flex flex-col gap-1 min-h-[94px]">
                <label htmlFor="" className="text-#121214">Nome Completo</label>
                <input
                  {...register("name")}
                  className="border border-zinc-200 shadow-sm rounded h-10 text-zinc-900 p-2 outline-zinc-400"
                />
                <p className="text-red-700 text-xs relative">{errors.name?.message}</p>
              </div>

              <div className="flex flex-col gap-1 min-h-[94px]">
                <label htmlFor="" className="text-#121214">E-mail</label>
                <input
                  {...register("email")}
                  className="border border-zinc-200 shadow-sm rounded h-10 text-zinc-900 p-2 outline-zinc-400"
                />
                <p className="text-red-700 text-xs relative">{errors.email?.message}</p>
              </div>

              <div className="flex flex-col gap-1 min-h-[94px]">
                <label htmlFor="" className="text-#121214">CPF</label>
                <input
                  {...register("cpf")}
                  className="border border-zinc-200 shadow-sm rounded h-10 text-zinc-900 p-2 outline-zinc-400"
                />
                <p className="text-red-700 text-xs relative">{errors.cpf?.message}</p>
              </div>

              <div className="flex flex-col gap-1 min-h-[94px]">
                <label htmlFor="" className="text-#121214">Endereço</label>
                <input
                  {...register("address")}
                  className="border border-zinc-200 shadow-sm rounded h-10 text-zinc-900 p-2 outline-zinc-400"
                />
                <p className="text-red-700 text-xs relative">{errors.address?.message}</p>
              </div>
              <button type="submit" className="bg-gradient-to-b from-[#ffbf00] to-[#f2a50c] rounded text-white font-bold h-10 outline-zinc-400">
                {
                  isSubmiting ?
                    <TailSpin
                      height="30"
                      width="30"
                      color="#fff"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{ marginLeft: '140px' }}
                      wrapperClass=""
                      visible={true}
                    />
                    :
                    <p>ENVIAR</p>
                }
              </button>

            </form>
            :
            <div className="flex flex-col items-center justify-center gap-8">
              <h1 className="text-zinc-950 text-5xl text-center">Enviado com Sucesso!</h1>
              <svg xmlns="http://www.w3.org/2000/svg" width="64" fill="#f2a50c" height="64" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.25 8.891l-1.421-1.409-6.105 6.218-3.078-2.937-1.396 1.436 4.5 4.319 7.5-7.627z"/></svg>
              <div className="flex flex-col items-center justify-center">
                <span className="block mb-8">Conheça a IMAGINARUIM</span>
                <Link href="https://www.instagram.com/sigaimaginarium/" className="text-center">
                  <span className="py-4 px-10 bg-gradient-to-b from-[#ffbf00] to-[#f2a50c] rounded text-white font-bold h-10 outline-zinc-400">IR PARA LOJA</span>
                </Link>
              </div>
            </div>
        }
      </div>
    </main>
  )
}