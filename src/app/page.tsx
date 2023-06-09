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
  newsLetter: boolean;
  permitionData: boolean;
};

const schema = yup.object({
  name: yup.string().required('campo obrigatório').nullable(),
  email: yup.string().email('digite um e-mail válido').required('campo obrigatório'),
  telefone: yup.string().required('campo obrigatório'),
  birthday: yup.string().required('campo obrigatório'),
  newsLetter: yup.bool(),
  permitionData: yup.bool().oneOf([true], 'campo obrigatório'),
});

const path = process.env.NEXT_PUBLIC_NANICA_TAB_PATH

export default function NanicaForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [value, setValue] = useState('');

  const onSubmit = async ({ name, email, telefone, birthday, newsLetter, permitionData }: Inputs) => {
    setIsSubmiting(true)
    console.log(errors)
    try {
      //@ts-ignore
      const response = await fetch(path, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify([[name, email, telefone, birthday, `${newsLetter ? 'Sim' : 'Não'}`, `${permitionData ? 'Sim' : 'Não'}`, new Date().toLocaleDateString('pt-BR')]])
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

  return (
    <main className="h-screen w-screen max-w-full md:py-6 flex overflow-y-scroll xl:overflow-y-hidden overflow-x-hidden flex-col-reverse justify-around items-center md:flex-row font-gillSans bg-[#FFF9E7]">
      {
        !isSuccess ?
          <>
            <div className="w-screen md:w-3/4 max-w-full pt-12  flex items-center justify-center overflow-x-hidden relative">
            <Image src="img/balloon.svg" alt="logo" width={303} height={330} className="absolute top-[-20px] left-[45%] overflow-x-hidden md:hidden" />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2 w-[90%] md:w-[100%] max-w-[440px] py-4"
              >
                <div className="flex flex-col gap-1 min-h-[84px] md:min-h-[108px]">
                  <label htmlFor="" className="text-[#3E2412] font-bold mb-2">Nome Completo</label>
                  <input
                    {...register("name")}
                    className="border shadow-sm h-10 md:h-12 text-[#3E2412] p-2 pb-1 outline-zinc-400 border-[#733B17] z-10"
                  />
                  <p className="text-red-700 text-xs relative">{errors.name?.message}</p>
                </div>

                <div className="flex flex-col gap-1 min-h-[84px] md:min-h-[108px]">
                  <label htmlFor="" className="text-[#3E2412] font-bold mb-2">E-mail</label>
                  <input
                    {...register("email")}
                    className="border shadow-sm h-10 md:h-12 text-[#3E2412] p-2 pb-1 outline-zinc-400 border-[#733B17] z-10"
                  />
                  <p className="text-red-700 text-xs relative">{errors.email?.message}</p>
                </div>

                <div className="flex flex-col gap-1 min-h-[84px] md:min-h-[108px]">
                  <label htmlFor="" className="text-[#3E2412] font-bold mb-2">Telefone</label>
                  <ReactInputMask
                    mask={"(99) 99999-9999"}
                    maskPlaceholder=''
                    alwaysShowMask={false}
                    type="text"
                    {...register("telefone")}
                    className="border shadow-sm h-10 md:h-12 text-[#3E2412] p-2 pb-1 outline-zinc-400 border-[#733B17] z-10"
                  />
                  <p className="text-red-700 text-xs relative">{errors.telefone?.message}</p>
                </div>

                <div className="flex flex-col gap-1 min-h-[84px] md:min-h-[108px]">
                  <label htmlFor="" className="text-[#3E2412] font-bold mb-2">Data de nascimento</label>
                  <ReactInputMask
                    mask={"99/99/9999"}
                    maskPlaceholder=''
                    alwaysShowMask={false}
                    type="text"
                    {...register("birthday")}
                    className="border shadow-sm h-10 md:h-12 text-[#3E2412] p-2 pb-1 outline-zinc-400 border-[#733B17] z-10"
                  />
                  <p className="text-red-700 text-xs relative">{errors.birthday?.message}</p>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <input
                    type="checkbox"
                    {...register("newsLetter")}
                    className="border shadow-sm h-4 text-[#3E2412] p-2 pb-1 outline-zinc-400 border-[#733B17] accent-[#733B17] cursor-pointer w-4 bg-[#FFF9E7]"
                  />
                  <label htmlFor="" className="text-[#3E2412] text-sm font-semibold mt-1">Aceita receber comunicação do Nanica?</label>
                </div>
                <div className="md:min-h-[100px] min-h-[94px]">
                <div className="flex items-start gap-4 md:mt-4 mt-2">
                <input
                    type="checkbox"
                    {...register("permitionData")}
                    className="border shadow-sm h-4 text-[#3E2412] p-2 pb-1 outline-zinc-400 border-[#733B17] accent-[#733B17] cursor-pointer w-4 bg-[#FFF9E7]"
                  />
                  <p className="w-[100%] font-semibold text-sm text-[#3E2412] text-justify">
                  Solicitamos permissão para usar seus dados pessoais internamente, visando melhorar nossos serviços. Garantimos a confidencialidade e proteção adequada dos seus dados. Por favor, confirme se concorda com o uso *.
                  </p>
                </div>
                <p className="text-red-700 text-xs relative ml-8">{errors.permitionData?.message}</p>
                </div>
                <button type="submit" className="bg-[#733B17] text-white font-bold h-10 md:h-12 outline-zinc-400 mt-2">
                  {
                    isSubmiting ?
                      <TailSpin
                        height="30"
                        width="30"
                        color="#fff"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{ marginLeft: '45%' }}
                        wrapperClass=""
                        visible={true}
                      />
                      :
                      <p>ENVIAR</p>
                  }
                </button>

              </form>
            </div>

            <div className="md:w-2/5 w-screen flex flex-col items-center md:justify-between justify-center h-[] py-4 2xl:py-[5%] md:h-screen">
              <Image src="img/nanica_logo.svg" alt="logo" width={185} height={96} className="" />
              <Image src="img/balloon.svg" alt="logo" width={303} height={330} className="md:block hidden" />
            </div>
          </>
          :
          <SuccessMessage />
      }
    </main>
  )
}