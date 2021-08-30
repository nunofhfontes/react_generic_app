import Head from 'next/head';

import '../styles/globals.css'

import AddUser from '../components/Users/AddUser';

export default function Home() {
  return (
    <div className="bg-black h-screen font-sans flex items-center w-full bg-teal-lighter justify-center">
      <AddUser />
    </div>
  )
}


