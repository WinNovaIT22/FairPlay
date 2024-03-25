"use client";

import {
  Select,
  SelectItem,
} from "@nextui-org/react";
export default function YearReplay() {
  const currentYear = new Date().getFullYear();
  const startYear = 2024;
  const numberOfYears = 5;
  const years = Array.from(
    { length: numberOfYears },
    (_, index) => startYear + index
  );

  return (
    <>
      <div className="text-center text-xl font-bold">Fairplay vuosikoosteet</div>
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
      </div>
    </>
  );
}
