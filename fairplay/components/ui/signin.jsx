"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import Link from 'next/link';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { signIn } from 'next-auth/react';
import { Input, Button } from '@nextui-org/react';

export default function Signin() {
  const router = useRouter()
  const [isVisible, setIsVisible] = React.useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e) => {
    e.preventDefault();

    const signInData = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
    })
    
    if(!signInData?.error) {
      console.log(signInData.error)
    } else {
      router.push('/')
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-80 border border-gray-300 rounded-md shadow-md overflow-hidden m-4">
        <div className="bg-blue-950 text-white text-center py-4">
          <div className="text-xl font-bold">Kirjaudu</div>
        </div>
        <form className="p-4 flex flex-col items-center" onSubmit={onSubmit}>
          <Input
            type="email"
            radius="sm"
            label="Sähköposti"
            variant="faded"
            className="mb-3"
            placeholder="Syötä sähköposti"
            labelPlacement="outside"
            onChange={handleInputChange}
          />
          <Input
            label="Salasana"
            radius="sm"
            variant="faded"
            placeholder="Syötä salasana"
            labelPlacement="outside"
            className="mb-5"
            onChange={handleInputChange}
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <IoEyeOffOutline size={22} className="text-2xl text-slate-950 pointer-events-none" />
                ) : (
                  <IoEyeOutline size={22} className="text-2xl text-slate-950 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          <Button className="bg-blue-950 text-white font-semibold w-full tracking-widest text-xl" radius="md" type="submit">Sisään</Button>

          <p className="text-center mt-6">
            Eikö sinulla ole käyttäjää?<br></br>
            <Link legacyBehavior href="/rekisteroidy">
              <a className="text-blue-700">Tee se tästä</a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
