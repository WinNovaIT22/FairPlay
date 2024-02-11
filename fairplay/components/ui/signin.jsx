"use client"

import React, { useState } from "react";
import Link from 'next/link';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { signIn } from 'next-auth/react';
import "../../styles/globals.css"
import { Input, Button } from '@nextui-org/react';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signin() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signInData = await signIn('username-login', {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
  
    if (signInData?.error) {
      console.log(signInData.error);
      notify()
    } else {
      console.log(signInData)
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

  const notify = () => toast.error("Sähköposti tai salasana väärin!");

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
      <div className="w-80 border-2 bg-zinc-700 border-red-950 rounded-md shadow-md overflow-hidden m-4">
        <div className="bg-red-950 text-white text-center py-4">
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
            onChange={handleInputChange}
          />
          <Input
            label="Salasana"
            radius="sm"
            name="password"
            variant="faded"
            placeholder="Syötä salasana"
            labelPlacement="outside"
            className="mb-5"
            onChange={handleInputChange}
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <IoEyeOffOutline size={22} className="text-2xl text-slate-300 pointer-events-none" />
                ) : (
                  <IoEyeOutline size={22} className="text-2xl text-slate-300 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          <Button className="bg-red-950 text-white font-semibold w-full tracking-widest text-xl" radius="md" type="submit">Sisään</Button>

          <p className="text-center text-slate-300 mt-6">
            Eikö sinulla ole käyttäjää?<br></br>
            <Link legacyBehavior href="/rekisteroidy">
              <a className="text-blue-600 underline">Tee se tästä</a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}