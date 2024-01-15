"use client"
import React, { useState, useEffect } from "react";
import "../../styles/signup-in.css"
import { Envelope, EyeFill, EyeSlashFill, Search } from 'react-bootstrap-icons';
import { Input, Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { useAsyncList } from "@react-stately/data";

export default function Signup(query) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const toggleVisibility = () => setIsVisible(!isVisible);

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

  return (
    <div className="wrapper">
      <div className="card-switch">
        <div className="flip-card__inner">
          <div className="flip-card__front">
            <div className="title">Rekisteröidy</div>
              <form className="flip-card__form flex flex-wrap justify-center" action="">
                <div className="flex items-center gap-4">
                  <Input
                    type="text"
                    variant="bordered"
                    label="Etunimi"
                    placeholder="Syötä etunimi"
                    labelPlacement="outside"
                  />
                  <Input
                    type="text"
                    variant="bordered"
                    label="Sukunimi"
                    placeholder="Syötä sukunimi"
                    labelPlacement="outside"
                  />
                </div>
                <Autocomplete
                  variant="bordered"
                  inputValue={searchQuery}
                  isLoading={list.isLoading}
                  items={list.items}
                  label="Ajoneuvo"
                  placeholder="Etsi oma ajokkisi"
                  labelPlacement="outside"
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
                  placeholder="Syötä sähköposti"
                  labelPlacement="outside"
                  startContent={
                    <Envelope size={22} className="mr-2 text-2xl text-default-500 pointer-events-none flex-shrink-0" />
                  }
                />
                <Input
                  label="Salasana"
                  variant="bordered"
                  placeholder="Syötä salasana"
                  labelPlacement="outside"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeSlashFill size={22} className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFill size={22} className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="max-w-xs"
                />
                <Input
                  label="Vahvista salasana"
                  variant="bordered"
                  placeholder="Syötä salasana uudelleen"
                  labelPlacement="outside"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeSlashFill size={22} className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFill size={22} className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="max-w-xs"
                />
              <button className="flip-card__btn">Luo käyttäjä</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
