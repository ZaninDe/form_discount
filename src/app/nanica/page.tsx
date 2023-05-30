import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Desconto Nanica',
  description:
    'This is a meta description. Welcome to slingacademy.com. Happy coding and have a nice day',
};

const NANICA_TAB1= process.env.NEXT_PUBLIC_NANICA_TAB1
const NANICA_TAB2= process.env.NEXT_PUBLIC_NANICA_TAB2

 
import { Form } from "../../components/Form";
export default function Nanica() {
  return (
    <div>
      <Form 
      //@ts-ignore
        tab1={NANICA_TAB1}
        //@ts-ignore
        tab2={NANICA_TAB2}
      />
    </div>
  )
}