"use client";

import React, { useState } from "react";
import {
  Select,
  SelectItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { CiCircleInfo } from "react-icons/ci";
import TasksTable from "@/components/ui/taskTable";
import { FaHome } from "react-icons/fa";

export default function Tasks() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const startYear = 2024;
  const numberOfYears = 5;
  const years = Array.from(
    { length: numberOfYears },
    (_, index) => startYear + index
  );

  return (
    <div className="bg-gradient-to-b from-yellow-800 to-stone-900 min-h-screen w-full">
      <div className="shadow-lg backdrop-blur-2xl text-2xl p-4 font-black rounded-lg flex justify-center items-center">
        <div className="absolute left-2">
          <a href="/yllapitaja" className="navigation-card">
            <FaHome size={24} color="black" />
          </a>
        </div>
        FairPlay suoritukset
      </div>
      <div className="flex justify-center items-center flex-row">
        <Select
          label="Vuosi"
          className="w-32 mt-5"
          defaultSelectedKeys={[currentYear.toString()]}
          labelPlacement="outside-left"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {years.map((year) => (
            <SelectItem key={year} value={year} textValue={year}>
              {year}
            </SelectItem>
          ))}
        </Select>
        <Popover placement="bottom" showArrow={true}>
          <PopoverTrigger>
            <Button variant="light" isIconOnly>
              <CiCircleInfo size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2 w-48">
              <div className="text-tiny break-all">
                Kilpailijalle näkyy aina nykyisen vuoden suoritukset. Vanhat
                suoritukset pysyvät tallessa täällä ylläpitäjiä varten.
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <TasksTable year={year} />
    </div>
  );
}
