"use client"

import React from "react";
import Link from 'next/link';
import { Envelope, EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { signIn } from 'next-auth/react'
import { Input } from '@nextui-org/react';
import "../../styles/signup-in.css"

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
    <div className="wrapper">
      <div className="card-switch">
        <div className="flip-card__inner">
          <div className="flip-card__front">
            <div className="title">Kirjaudu</div>
              <form className="flip-card__form" onSubmit={onSubmit}>
                <Input
                    type="email"
                    variant="bordered"
                    label="Sähköposti"
                    placeholder="Syötä sähköposti"
                    labelPlacement="outside"
                    startContent={
                      <Envelope size={22} className="mr-2 text-2xl text-default-400 pointer-events-none flex-shrink-0" />
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
                />
              <button className="flip-card__btn" type="submit">Sisään</button>
            </form>
            <p className="register-link">
              Eikö sinulla ole tunnuksia?{' '}
              <Link legacyBehavior href="/rekisteroidy"><a><br></br>Tee käyttäjä tästä</a></Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
