'use client'

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { FaMotorcycle } from "react-icons/fa6";
import { IoPerson, IoInformationCircleSharp } from "react-icons/io5";
import { TbLogout, TbSettings } from "react-icons/tb";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <Dropdown>
      <DropdownTrigger className="cursor-pointer">
        <TbSettings size={35} />
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Settings Menu">
        <DropdownItem key="account" href="/profiili/kayttaja" startContent={<IoPerson size={15} />}>Käyttäjätiedot</DropdownItem>
        <DropdownItem key="vehicles" href="/profiili/ajoneuvot" startContent={<FaMotorcycle size={15} />}>Ajoneuvosi</DropdownItem>
        <DropdownItem key="info" href="/profiili/ohjeet" startContent={<IoInformationCircleSharp size={15} />}>Ohjeita käyttöön</DropdownItem>
        <DropdownItem key="logout" className="text-danger" color="danger" onClick={() => signOut()} startContent={<TbLogout size={15} />}>Kirjaudu ulos</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}