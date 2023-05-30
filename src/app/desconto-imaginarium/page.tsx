import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Desconto Imaginarium',
  description:
    'This is a meta description. Welcome to slingacademy.com. Happy coding and have a nice day',
};

const IMAGINARIUM_TAB1= process.env.NEXT_PUBLIC_IMAGINARIUM_TAB1
const IMAGINARIUM_TAB2= process.env.NEXT_PUBLIC_IMAGINARIUM_TAB2

 
import { ImaginariumForm } from "../../components/ImaginariumForm";
export default function Imaginarium() {
  return (
    <div>
      <ImaginariumForm 
      //@ts-ignore
        tab1={IMAGINARIUM_TAB1}
        //@ts-ignore
        tab2={IMAGINARIUM_TAB2}
      />
    </div>
  )
}