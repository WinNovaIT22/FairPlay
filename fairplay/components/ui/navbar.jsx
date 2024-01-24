'use client'

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { List, PersonFill, Bicycle, BoxArrowInRight, InfoCircle } from 'react-bootstrap-icons';

export default function Navbar() {
  return (
    <Dropdown>
      <DropdownTrigger className="cursor-pointer">
        <List size={35} />
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Settings Menu">
        <DropdownItem key="account" startContent={<PersonFill />}>Käyttäjätiedot</DropdownItem>
        <DropdownItem key="vehicles" startContent={<Bicycle />}>Ajoneuvosi</DropdownItem>
        <DropdownItem key="info" href="/ohjeita" startContent={<InfoCircle />}>Ohjeita käyttöön</DropdownItem>
        <DropdownItem key="logout" className="text-danger" color="danger" startContent={<BoxArrowInRight />}>Kirjaudu ulos</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}