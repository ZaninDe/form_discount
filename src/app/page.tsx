/* eslint-disable @next/next/no-css-tags */
"use client"; // This is a client component 👈🏽
import { useState } from "react"
import Image from "next/image";
import { TailSpin } from 'react-loader-spinner'
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { SuccessMessage } from "@/components/SuccessMessage";
import ReactInputMask from "react-input-mask";

type Inputs = {
  name: string,
  email: string,
  telefone: string,
  birthday: string,
  permitionData: boolean
};

const schema = yup.object({
  name: yup.string().required('campo obrigatório').nullable(),
  email: yup.string().email('digite um e-mail válido').required('campo obrigatório'),
  telefone: yup.string().required('campo obrigatório'),
  birthday: yup.string().required('campo obrigatório'),
  permitionData: yup.bool().required()
});

const path = process.env.NEXT_PUBLIC_NANICA_TAB_PATH

export default function NanicaForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [value, setValue] = useState('');

  const onSubmit = async ({ name, email, telefone, birthday, permitionData }: Inputs) => {
    setIsSubmiting(true)
    console.log(errors)
    try {
      //@ts-ignore
      const response = await fetch(path, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify([[name, email, telefone, birthday, `${permitionData ? 'Sim' : 'Não'}`, new Date().toLocaleDateString('pt-BR')]])
      })
      await response.json()
      setIsSuccess(true)
    } catch (err) {
      console.log(err)
    } finally {
      reset();
      setIsSubmiting(false)
    }
  };

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
      <main className="h-screen w-screen flex flex-col-reverse md:flex-row font-gillSans bg-[#FFF9E7]">
        {
          !isSuccess ?
            <>
              <div className="w-screen md:w-3/4 flex items-center md:justify-start justify-center p-4 md:p-28">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-2 w-[100%] max-w-[520px]"
                >
                  <div className="flex flex-col gap-1 min-h-[108px]">
                    <label htmlFor="" className="text-[#3E2412] font-bold mb-2">Nome Completo</label>
                    <input
                      {...register("name")}
                      className="border shadow-sm h-12 text-zinc-900 p-2 outline-zinc-400 border-[#733B17]"
                    />
                    <p className="text-red-700 text-xs relative">{errors.name?.message}</p>
                  </div>

                  <div className="flex flex-col gap-1 min-h-[108px]">
                    <label htmlFor="" className="text-[#3E2412] font-bold mb-2">E-mail</label>
                    <input
                      {...register("email")}
                      className="border shadow-sm h-12 text-zinc-900 p-2 outline-zinc-400 border-[#733B17]"
                    />
                    <p className="text-red-700 text-xs relative">{errors.email?.message}</p>
                  </div>

                  <div className="flex flex-col gap-1 min-h-[108px]">
                    <label htmlFor="" className="text-[#3E2412] font-bold mb-2">telefone</label>
                    <ReactInputMask
                      mask={"(99) 99999-9999"}
                      maskPlaceholder=''
                      alwaysShowMask={false}
                      type="text"
                      {...register("telefone")}
                      className="border shadow-sm h-12 text-zinc-900 p-2 outline-zinc-400 border-[#733B17]"
                    />
                    <p className="text-red-700 text-xs relative">{errors.telefone?.message}</p>
                  </div>

                  <div className="flex flex-col gap-1 min-h-[108px]">
                    <label htmlFor="" className="text-[#3E2412] font-bold mb-2">Data de nascimento</label>
                    <input
                      type="date"
                      placeholder=""
                      {...register("birthday")}
                      className="focus:text-base text-[0px] border shadow-sm h-12 text-zinc-900 p-2 outline-zinc-400 border-[#733B17]"
                    />
                    <p className="text-red-700 text-xs relative">{errors.birthday?.message}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <input
                      type="checkbox"
                      {...register("permitionData")}
                      className="border shadow-sm h-6 text-zinc-900 p-2 outline-zinc-400 border-[#733B17] accent-[#733B17] cursor-pointer w-6"
                    />
                    <label htmlFor="" className="text-[#3E2412] font-bold">Aceita receber comunicação do Nanica?</label>
                  </div>
                  <p className="text-red-700 text-xs relative">{errors.birthday?.message}</p>
                  <p className="w-[100%] font-semibold text-sm text-[#3E2412] text-justify">
                    Solicitamos permissão para usar seus dados pessoais internamente, visando melhorar nossos serviços.
                    Garantimos a confidencialidade e proteção adequada dos seus dados. Por favor, confirme se concorda com o
                    uso.
                  </p>
                  <button type="submit" className="bg-[#733B17] text-white font-bold h-12 outline-zinc-400 mt-4">
                    {
                      isSubmiting ?
                        <TailSpin
                          height="30"
                          width="30"
                          color="#fff"
                          ariaLabel="tail-spin-loading"
                          radius="1"
                          wrapperStyle={{ marginLeft: '240px' }}
                          wrapperClass=""
                          visible={true}
                        />
                        :
                        <p>ENVIAR</p>
                    }
                  </button>

                </form>
              </div>

              <div className="md:w-2/5 w-screen flex flex-col items-center md:justify-between justify-center md:max-h-[1120px] md:h-screen">
                <Image src="img/nanica_logo.svg" alt="logo" width={297} height={206} className="min-w-[297px] min-h-[209px]" />
                <Image src="img/balloon.svg" alt="logo" width={471} height={528} className="md:block hidden" />
              </div>
            </>
            :
            <SuccessMessage />
        }

      </main>
  )
}