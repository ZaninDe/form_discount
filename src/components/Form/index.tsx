"use client"; // This is a client component 👈🏽
import { useState } from "react"
import { TailSpin } from  'react-loader-spinner'

type FormProps = {
  tab1: string;
  tab2: string;
}

export function Form({tab1, tab2}: FormProps ) {
  const [isSubmiting, setIsSubmiting ] = useState(false)
  const [data, setData] = useState({
    name: "",
    email: "",
    cpf: "",
    address: ""
  })

  const { name, email, cpf, address } = data

  const handleChange = (e: any) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  console.log(tab1, tab2)

  const handleSubmit = async (e: any) => {
    setIsSubmiting(true)
    e.preventDefault()

    try {
      const response = await fetch(tab1, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify([[name, email, cpf, new Date().toLocaleDateString('pt-BR')]])
      })
      await response.json()
      setData({...data, name: "", email: "", cpf: ""})
    } catch (err) {
      console.log(err)
    }

    try {
      const response = await fetch(tab2, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify([[name, email, cpf, address,  new Date().toLocaleDateString('pt-BR')]])
      })
      await response.json()
      setData({...data, name: "", email: "", cpf: "", address: ""})
    } catch (err) {
      console.log(err)
    } finally {
      setIsSubmiting(false)
    }
  }
  
  return (
    <main className="h-screen bg-zinc-50 flex items-center justify-center">
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-xs"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="" className="text-zinc-900">Nome</label>
        <input 
          value={name}
          onChange={handleChange}
          type="name"
          name="name"
          className="border border-zinc-200 shadow-sm rounded h-10 text-zinc-900 p-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="" className="text-zinc-900">E-mail</label>
        <input 
          value={email}
          onChange={handleChange}
          type="email"
          name="email"
          className="border border-zinc-200 shadow-sm rounded h-10 text-zinc-900 p-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="" className="text-zinc-900">CPF</label>
        <input 
          value={cpf}
          onChange={handleChange}
          type="CPF"
          name="cpf"
          className="border border-zinc-200 shadow-sm rounded h-10 text-zinc-900 p-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="" className="text-zinc-900">Endereço</label>
        <input 
          value={address}
          onChange={handleChange}
          type="text"
          name="address"
          className="border border-zinc-200 shadow-sm rounded h-10 text-zinc-900 p-2"
        />
      </div>
      <button type="submit" className="bg-purple-700 rounded font-semibold text-white h-10">
        {
          isSubmiting ?
          <TailSpin
            height="30"
            width="30"
            color="#fff"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{marginLeft: '140px'}}
            wrapperClass=""
            visible={true}
          />
          :
          <p>Enviar</p>
        }
      </button>

    </form>
  </main>
  )
}