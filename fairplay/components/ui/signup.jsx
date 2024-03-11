"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoSearchOutline, IoMailOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Input, Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import "@/styles/globals.css"
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import localFont from "next/font/local";

const myFont = localFont({
  src: "./PatchedPersonalUseOnlyBlack-GOyOG.otf",
});

const Signup = () => {
  const router = useRouter();
  const [isVisiblePassword1, setIsVisiblePassword1] = useState(false);
  const [isVisiblePassword2, setIsVisiblePassword2] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const toggleVisibilityPassword1 = () => setIsVisiblePassword1(!isVisiblePassword1);
  const toggleVisibilityPassword2 = () => setIsVisiblePassword2(!isVisiblePassword2);

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

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const vehicleData = selectedVehicle ? `${selectedVehicle.merkkiSelvakielinen} ${selectedVehicle.kaupallinenNimi}` : "";
  
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, vehicle: vehicleData }),
      });
  
      if (response.ok) {
        setTimeout(() => {
          router.push("/kirjaudu");
        }, 3000);
        const data = await response.json();
        notifysuccess();
        console.log(data);
      } else {
        console.error("Error creating user:", response.status);
        notifyerror();
      }
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const notifysuccess = () =>
    toast.success("Käyttäjä luotu onnistuneesti, kirjaudu nyt sisään!");
  const notifyerror = () =>
    toast.error("Tällä sähköpostilla on jo olemassaoleva käyttäjä, kirjaudu sisään?");

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Syötä etunimi"),
    lastname: Yup.string().required("Syötä sukunimi"),
    // vehicle: Yup.string().required("Valitse ajoneuvo"),
    email: Yup.string().email("Syötä kelvollinen sähköpostiosoite").required("Syötä sähköposti"),
    password: Yup.string().required("Syötä salasana").min(8, "Salasanan tulee olla vähintään 8 merkkiä pitkä"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Salasanat eivät täsmää")
      .required("Syötä salasana uudelleen"),
  });

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
      <div className="w-96 border bg-zinc-700 border-red-950 rounded-md shadow-md overflow-hidden m-4">
        <div className="bg-red-950 text-white text-center py-4">
          <div className={`text-slate-300 text-xl ${myFont.className}`}>Rekisteröidy</div>
        </div>
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            vehicle: "",
            email: "",
            password: "",
            passwordConfirm: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="p-4 flex flex-col items-center">
              <div className="flex items-center space-x-4 mb-4">
                <div>
                  <Field
                    type="text"
                    name="firstname"
                    radius="sm"
                    variant="faded"
                    label="Etunimi"
                    placeholder="Syötä etunimi"
                    labelPlacement="outside"
                    style={{ textTransform: 'capitalize' }}
                    as={Input}
                  />
                  <ErrorMessage name="firstname" component="div" className="error-message" />
                </div>
                <div>
                  <Field
                    type="text"
                    variant="faded"
                    name="lastname"
                    radius="sm"
                    label="Sukunimi"
                    placeholder="Syötä sukunimi"
                    labelPlacement="outside"
                    style={{ textTransform: 'capitalize' }}
                    as={Input}
                  />
                  <ErrorMessage name="lastname" component="div" className="error-message" />
                </div>
              </div>
              <div style={{ width: '100%' }} className="mb-3">
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
                   onInputChange={(value) => {
                    setSearchQuery(value);
                    setSelectedVehicle({ target: { name: "vehicle", value } });
                  }}
                  startContent={<IoSearchOutline size={22} className="mr-1 text-2xl text-slate-300 pointer-events-none flex-shrink-0" />}
                >
                  {(item) => (
                    <AutocompleteItem key={item.id} value={item.merkkiSelvakielinen} textValue={`${item.merkkiSelvakielinen} ${item.kaupallinenNimi}`} className="py-2">
                      {item.merkkiSelvakielinen} {item.kaupallinenNimi}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <ErrorMessage name="vehicle" component="div" className="error-message" />
              </div>
             <div style={{ width: '100%' }} className="mb-3">
              <Field
                  type="email"
                  variant="faded"
                  label="Sähköposti"
                  radius="sm"
                  name="email"
                  placeholder="Syötä sähköposti"
                  labelPlacement="outside"
                  startContent={<IoMailOutline size={22} className="mr-1 text-2xl text-slate-300 pointer-events-none flex-shrink-0" />}
                  as={Input}
                />
                <ErrorMessage name="email" component="div" className="error-message" />
             </div>
             <div style={{ width: '100%' }} className="mb-3">
              <Field
                label="Salasana"
                name="password"
                variant="faded"
                placeholder="Syötä salasana"
                radius="sm"
                labelPlacement="outside"
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibilityPassword1}>
                    {isVisiblePassword1 ? (
                      <IoEyeOffOutline size={22} className="text-2xl text-slate-300 pointer-events-none" />
                    ) : (
                      <IoEyeOutline size={22} className="text-2xl text-slate-300 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisiblePassword1 ? "text" : "password"}
                as={Input}
              />
              <ErrorMessage name="password" component="div" className="error-message" />
             </div>
             <div style={{ width: '100%' }} className="mb-5">
              <Field
                label="Salasana uudelleen"
                name="passwordConfirm"
                variant="faded"
                placeholder="Syötä salasana uudelleen"
                radius="sm"
                labelPlacement="outside"
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibilityPassword2}>
                    {isVisiblePassword2 ? (
                      <IoEyeOffOutline size={22} className="text-2xl text-slate-300 pointer-events-none" />
                    ) : (
                      <IoEyeOutline size={22} className="text-2xl text-slate-300 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisiblePassword2 ? "text" : "password"}
                as={Input}
              />
              <ErrorMessage name="passwordConfirm" component="div" className="error-message" />
             </div>
              <Button className={`bg-red-950 text-slate-300 w-full text-md ${myFont.className}`} radius="md" type="submit" disabled={isSubmitting}>
                Luo käyttäjä
              </Button>

              <p className="text-center text-slate-300 mt-6">
                Onko sinulla jo käyttäjä?<br></br>
                <Link legacyBehavior href="/kirjaudu">
                  <a className="text-blue-600 underline">Kirjaudu tästä</a>
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;