"use client"

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { IoSearchOutline, IoMailOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Input, Autocomplete, AutocompleteItem, Button, Checkbox } from '@nextui-org/react';
import { useAsyncList } from "@react-stately/data";

import localFont from 'next/font/local'

const myFont = localFont({
    src: './PatchedPersonalUseOnlyBlack-GOyOG.otf' 
})

export default function Signup() {
  const router = useRouter();
  const [isVisiblePassword1, setIsVisiblePassword1] = React.useState(false);
  const [isVisiblePassword2, setIsVisiblePassword2] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    vehicle: "",
    email: "",
    password: "",
  });

  const toggleVisibilityPassword1 = () => setIsVisiblePassword1(!isVisiblePassword1);
  const toggleVisibilityPassword2 = () => setIsVisiblePassword2(!isVisiblePassword2);

  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);

  let list = useAsyncList({
    async load({ filterText }) {
      try {
        const response = await fetch(`/api/search?paramName=${filterText}`);
        const responseData = await response.json();

        return {
          items: responseData.data || [],
        };
      } catch (error) {
        console.error("Error loading data:", error);
        return {
          items: [],
        };
      }
    },
  });
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      list.setFilterText(searchQuery);
    } else {
      setSearchQuery("");
    }
  }, [searchQuery]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'email') setEmailValid(true);
    if (name === 'password') setPasswordValid(true);
    if (name === 'confirmPassword') setConfirmPasswordValid(true);
  };

  const validateForm = () => {
    if (!isValidEmail(formData.email)) {
      setEmailValid(false);
    }
    if (formData.password.length < 8) {
      setPasswordValid(false);
    }
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordValid(false);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    validateForm();

    if (!emailValid || !passwordValid || !confirmPasswordValid) {
      return;
    }
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/kirjaudu');
        const data = await response.json();
        alert(`Käyttäjäsi on luotu onnistuneesti, kirjaudu nyt sisään!`);
        console.log(data);
      } else {
        console.error('Error creating user:', response.status);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-96 border border-gray-200 rounded-md shadow-md overflow-hidden m-4">
        <div className="bg-blue-900 text-white text-center py-4">
          <div className={`tracking-widest text-xl ${myFont.className}`}>Rekisteröidy</div>
        </div>
        <form className="p-4 flex flex-col items-center" onSubmit={onSubmit}>
          <div className="flex items-center space-x-4 mb-4">
            <Input
              type="text"
              name="firstname"
              radius="sm"
              variant="faded"
              label="Etunimi"
              placeholder="Syötä etunimi"
              labelPlacement="outside"
              onChange={handleInputChange}
            />
            <Input
              type="text"
              variant="faded"
              name="lastname"
              radius="sm"
              label="Sukunimi"
              placeholder="Syötä sukunimi"
              labelPlacement="outside"
              onChange={handleInputChange}
            />
          </div>
          <Autocomplete
            variant="faded"
            inputValue={searchQuery}
            isLoading={list.isLoading}
            items={list.items}
            label="Ajoneuvo"
            radius="sm"
            name="vehicle"
            placeholder="Hae oma ajoneuvosi"
            labelPlacement="outside"
            className="mb-3"
            scrollShadowProps={{ isEnabled: false }}
            onChange={handleInputChange}
            onInputChange={(value) => setSearchQuery(value)}
            startContent={<IoSearchOutline size={22} className="mr-1 text-2xl text-slate-950 pointer-events-none flex-shrink-0" />}
          >
            {(item) => (
              <AutocompleteItem key={item.id} value={item.merkkiSelvakielinen} textValue={`${item.merkkiSelvakielinen} ${item.kaupallinenNimi}`} className="py-2">
                {item.merkkiSelvakielinen} {item.kaupallinenNimi}
              </AutocompleteItem>
            )}
          </Autocomplete>
          <Input
            type="email"
            variant="faded"
            label="Sähköposti"
            radius="sm"
            name="email"
            className="mb-3"
            placeholder="Syötä sähköposti"
            isInvalid={!emailValid}
            color={!emailValid ? "danger" : ""}
            errorMessage={!emailValid && "Please enter a valid email"}
            labelPlacement="outside"
            onChange={handleInputChange}
            startContent={<IoMailOutline size={22} className="mr-1 text-2xl text-slate-950 pointer-events-none flex-shrink-0" />}
          />
          <Input
            label="Salasana"
            name="password"
            onChange={handleInputChange}
            variant="faded"
            placeholder="Syötä salasana"
            radius="sm"
            className="mb-3"
            labelPlacement="outside"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibilityPassword1}>
                {isVisiblePassword1 ? (
                  <IoEyeOffOutline size={22} className="text-2xl text-slate-950 pointer-events-none" />
                ) : (
                    <IoEyeOutline size={22} className="text-2xl text-slate-950 pointer-events-none" />
                  )}
              </button>
            }
            type={isVisiblePassword1 ? "text" : "password"}
          />
          <Input
            label="Salasana uudelleen"
            name="confirmPassword"
            variant="faded"
            placeholder="Syötä salasana uudelleen"
            radius="sm"
            className="mb-3"
            labelPlacement="outside"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibilityPassword2}>
                {isVisiblePassword2 ? (
                  <IoEyeOffOutline size={22} className="text-2xl text-slate-950 pointer-events-none" />
                ) : (
                    <IoEyeOutline size={22} className="text-2xl text-slate-950 pointer-events-none" />
                  )}
              </button>
            }
            type={isVisiblePassword2 ? "text" : "password"}
          />
          <Checkbox size="sm" className="mb-5">Hyväksyn "käyttöehdot" ja "tietosuojaseloste"</Checkbox>

          <Button className={`bg-blue-950 text-white w-full tracking-widest text-md ${myFont.className}`} radius="md" type="submit">Luo käyttäjä</Button>

            <p className="text-center mt-6">
              Onko sinulla jo käyttäjä?<br></br>
            <Link legacyBehavior href="/kirjaudu">
              <a className="text-blue-700 underline">Kirjaudu tästä</a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
