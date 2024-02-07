"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import Link from 'next/link';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { signIn } from 'next-auth/react';
import "../../styles/globals.css"
import { Input, Button } from '@nextui-org/react';

export default function Signin() {
  const router = useRouter()
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
  
      if (res.error) {
        console.error("Sign-in error:", res.error);
        return
      }
    } catch (error) {
      console.error("Unexpected error during sign-in:", error);
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
        <div className="bg-blue-900 text-white text-center py-4">
          <div className="text-xl font-bold">Kirjaudu</div>
        </div>
        <form className="p-4 flex flex-col items-center" onSubmit={handleSubmit}>
          <Input
            type="email"
            radius="sm"
            label="Sähköposti"
            name="email"
            variant="faded"
            className="mb-3"
            placeholder="Syötä sähköposti"
            labelPlacement="outside"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Salasana"
            radius="sm"
            name="password"
            variant="faded"
            placeholder="Syötä salasana"
            labelPlacement="outside"
            className="mb-5"
            onChange={(e) => setPassword(e.target.value)}
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
              <a className="text-blue-700 underline">Tee se tästä</a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
