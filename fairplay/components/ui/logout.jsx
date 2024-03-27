"use client";

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { TbLogout } from "react-icons/tb";

export default function Logout() {
  return (
    <>
      <Button
        variant="flat"
        color="danger"
        className="font-bold text-md mb-3"
        onClick={() => signOut()}
      >
        <TbLogout size={20} />
        Kirjaudu ulos
      </Button>
    </>
  );
}
