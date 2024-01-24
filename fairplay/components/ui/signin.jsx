"use client"

import React from "react";
import Link from 'next/link';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { signIn } from 'next-auth/react';
import { Input, Button } from '@nextui-org/react';

export default function Signin() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e) => {
    e.preventDefault();

    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password
    })
    console.log(signInData)
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-80 border border-gray-300 rounded-md shadow-md overflow-hidden m-4">
        <div className="bg-blue-600 text-white text-center py-4">
          <div className="text-xl font-black">Kirjaudu</div>
        </div>
        <form className="p-4" onSubmit={onSubmit}>
          <Input
            type="email"
            radius="sm"
            label="Sähköposti"
            variant="faded"
            placeholder="Syötä sähköposti"
            labelPlacement="outside"
          />
          <Input
            label="Salasana"
            radius="sm"
            variant="faded"
            placeholder="Syötä salasana"
            labelPlacement="outside"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <IoEyeOffOutline size={22} className="text-2xl text-blue-500 pointer-events-none" />
                ) : (
                  <IoEyeOutline size={22} className="text-2xl text-blue-500 pointer-events-none" />
                )}
              </button>
            }
          />
          <Button className="bg-blue-600 text-white font-bold" radius="md" type="submit">Sisään</Button>
        </form>
        <p className="text-center mt-4">
          Eikö sinulla ole käyttäjää?<br></br>
          <Link legacyBehavior href="/rekisteroidy">
            <a className="text-blue-700">Tee se tästä!</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
