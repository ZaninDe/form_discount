import Head from 'next/head'
import './globals.css'
import { Roboto_Flex as Roboto } from 'next/font/google'
import localFont from 'next/font/local'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

const dk = localFont({
  src: '../../fonts/DK.otf',
  variable: '--font-dk',
})
const gillSans = localFont({
  src: '../../fonts/GillSans.otf',
  variable: '--font-gill',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en">
        <body className={`${dk.variable} ${gillSans.variable}  font-sans`}>{children}</body>
      </html>
    </>

  )
}
