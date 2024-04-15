"use client";

import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import { Button } from "@nextui-org/react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { FiSave } from "react-icons/fi";

export default function DateTime() {
  const [value1, setValue1] = useState(new Date());
  const [value2, setValue2] = useState(new Date());

  return (
    <>
      <div>
        Aseta FairPlay -kisan aloitus:
        <div className="flex flex-row">
          <DateTimePicker
            onChange={setValue1}
            value={value1}
            format="dd-MM-yyyy HH:mm"
          />
        </div>
      </div>
      <div className="mt-4">
        Aseta FairPlay -kisan lopetus:
        <div className="flex flex-row">
          <DateTimePicker
            onChange={setValue2}
            value={value2}
            format="dd-MM-yyyy HH:mm"
          />
        </div>
        <Button color="secondary" startContent={<FiSave size={20} />} className="mt-5 font-bold">Tallenna muutokset</Button>
      </div>
    </>
  );
}
