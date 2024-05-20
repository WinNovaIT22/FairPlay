"use client"

import { DateRangePicker, Button } from "@nextui-org/react";
import {parseZonedDateTime} from "@internationalized/date";

export default function DateTime() {
    return (
        <div className="w-full max-w-xl flex flex-row gap-4">
        <DateRangePicker
            hideTimeZone
            visibleMonths={2}
            defaultValue={{
              start: parseZonedDateTime("2024-04-01T00:45[Europe/Helsinki]"),
              end: parseZonedDateTime("2024-04-08T11:15[Europe/Helsinki]"),
            }}
          />
        <Button>Tallenna</Button>
      </div>
    );
  }  
  