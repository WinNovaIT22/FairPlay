"use client";

import {
  Select,
  SelectItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { CiCircleInfo } from "react-icons/ci";

export default function Tasks() {
  const currentYear = new Date().getFullYear();
  const startYear = 2024;
  const numberOfYears = 5;
  const years = Array.from(
    { length: numberOfYears },
    (_, index) => startYear + index
  );

  return (
    <div>
      <div className="text-center text-xl font-bold">Fairplay suoritukset</div>
      <div className="flex justify-center items-center flex-row">
        <Select
          label="Vuosi"
          className="w-32 mt-5"
          defaultSelectedKeys={[currentYear.toString()]}
          labelPlacement="outside-left"
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
    </div>
  );
}
