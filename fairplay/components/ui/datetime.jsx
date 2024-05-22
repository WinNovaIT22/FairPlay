"use client"

import { useEffect, useState } from "react";
import { DateRangePicker, Button } from "@nextui-org/react";
import { parseZonedDateTime, toZonedDateTime } from "@internationalized/date";

export default function DateTime() {
  const [defaultValue, setDefaultValue] = useState({
    start: parseZonedDateTime("2024-04-01T00:45[Europe/Helsinki]"),
    end: parseZonedDateTime("2024-04-08T11:15[Europe/Helsinki]"),
  });

  useEffect(() => {
    async function fetchDateRange() {
      try {
        const res = await fetch('/api/date-range');
        const data = await res.json();
        if (data.event) {
          setDefaultValue({
            start: parseZonedDateTime(data.event.start),
            end: parseZonedDateTime(data.event.end),
          });
        }
      } catch (error) {
        console.error("Failed to fetch date range:", error);
      }
    }

    fetchDateRange();
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch('/api/date-range', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start: defaultValue.start.toString(),
          end: defaultValue.end.toString(),
        }),
      });

      const result = await res.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error saving date range:", error);
    }
  };

  return (
    <div className="w-full max-w-xl flex flex-row gap-4">
      <DateRangePicker
        hideTimeZone
        visibleMonths={2}
        value={defaultValue}
        onChange={(value) => setDefaultValue(value)}
      />
      <Button onPress={handleSave}>Tallenna</Button>
    </div>
  );
}
