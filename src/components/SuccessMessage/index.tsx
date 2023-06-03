/* eslint-disable @next/next/no-css-tags */
import Link from "next/link";

import Image from "next/image";
import Head from "next/head";

export function SuccessMessage() {
  return (
    <>
      <main className="py-8 px-4 md:px-36 h-screen w-screen bg-hbackground_success bg-cover md:block flex overflow-y-scroll flex-col md:flex-row items-center gap-24">
        <Image src="img/logo_success.svg" alt="logo" width={225} height={900} className="md:mb-16 mb-0" />
        <div className="flex w-[100%] flex-col justify-center items-center gap-8">
          <Image src="img/check.svg" alt="logo" width={158} height={135} />
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-9xl xl:text-7xl max-w-[700px] text-[#3E2412] font-normal text-center font-custom font-dk">Obrigado por se cadastrar<br /> em nosso sistema.</h1>
          <p className="text-[#3E2412] text-lg md:text-xl font-semibold text-center max-w-[540px]">Seu cadastro foi confirmado com sucesso. Em breve, você receberá mais informações sobre nossos serviços.</p>
          <p className="text-[#3E2412] border-[2px] border-[#733B17] font-bold text-base md:text-xl text-center bg-white px-4 py-0">Parabéns por ganhar 10% de desconto em nossos produtos.<br />Código: Nanica 2023</p>
        </div>
      </main>
    </>

  )
}