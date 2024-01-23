"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from "react";
import "../../styles/signup-in.css"
import { Envelope, EyeFill, EyeSlashFill, Search } from 'react-bootstrap-icons';
import { Input, Autocomplete, AutocompleteItem,Button } from '@nextui-org/react';
import { useAsyncList } from "@react-stately/data";

export default function Signup() {
  const router = useRouter();
  const [isVisiblePassword1, setIsVisiblePassword1] = React.useState(false);
  const [isVisiblePassword2, setIsVisiblePassword2] = React.useState(false);
  const [value, setValue] = React.useState('');
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

  const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);

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
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/kirjaudu')
        const data = await response.json();
        console.log(data); 
      } else {
        console.error("Error creating user:", response.status);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
            <div className="text-header">Rekisteröidy</div>
            </div>
              <form className="card-body flex flex-wrap justify-center" onSubmit={onSubmit}>
                <div className="flex items-center gap-4">
                  <Input
                    type="text"
                    name="firstname"
                    variant="bordered"
                    label="Etunimi"
                    placeholder="Syötä etunimi"
                    labelPlacement="outside"
                    onChange={handleInputChange}
                  />
                  <Input
                    type="text"
                    variant="bordered"
                    name="lastname"
                    label="Sukunimi"
                    placeholder="Syötä sukunimi"
                    labelPlacement="outside"
                    onChange={handleInputChange}
                  />
                </div>
                <Autocomplete
                  variant="bordered"
                  inputValue={searchQuery}
                  isLoading={list.isLoading}
                  items={list.items}
                  label="Ajoneuvo"
                  name="vehicle"
                  placeholder="Hae oma ajoneuvosi"
                  labelPlacement="outside"
                  onChange={handleInputChange}
                  onInputChange={(value) => setSearchQuery(value)} 
                  startContent={
                    <Search size={22} className="mr-2 text-2xl text-default-500 pointer-events-none flex-shrink-0" />
                  }
                >
                  {(item) => (
                    <AutocompleteItem key={item.id} value={item.merkkiSelvakielinen} textValue={`${item.merkkiSelvakielinen} ${item.kaupallinenNimi}`} className="py-2">
                      {item.merkkiSelvakielinen} {item.kaupallinenNimi}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <Input
                  type="email"
                  variant="bordered"
                  label="Sähköposti"
                  name="email"
                  placeholder="Syötä sähköposti"
                  labelPlacement="outside"
                  onChange={handleInputChange}
                  isInvalid={true}
                  color={isInvalid ? "danger" : "success"}
                  errorMessage={isInvalid && "Please enter a valid email"}
                  startContent={
                    <Envelope size={22} className="mr-2 text-2xl text-default-500 pointer-events-none flex-shrink-0" />
                  }
                  className="max-w-xs"
                />
                <Input
                  label="Salasana"
                  name="password"
                  onChange={handleInputChange}
                  variant="bordered"
                  placeholder="Syötä salasana"
                  labelPlacement="outside"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibilityPassword1}>
                      {isVisiblePassword1 ? (
                        <EyeSlashFill size={22} className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFill size={22} className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisiblePassword1 ? "text" : "password"}
                  className="max-w-xs"
                />
                <Input
                  label="Salasana uudelleen"
                  variant="bordered"
                  placeholder="Syötä salasana uudelleen"
                  labelPlacement="outside"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibilityPassword2}>
                      {isVisiblePassword2 ? (
                        <EyeSlashFill size={22} className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFill size={22} className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisiblePassword2 ? "text" : "password"}
                  className="max-w-xs"
                />
              <Button style={{ backgroundColor: '#0047AB', color: '#FFFFFF' }} type="submit">Luo käyttäjä</Button>
            </form>
          </div>
  );
}
