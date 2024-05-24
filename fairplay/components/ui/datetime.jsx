"use client";

import { useEffect, useState } from "react";
import { DateRangePicker, Button } from "@nextui-org/react";
import { parseZonedDateTime } from "@internationalized/date";

export default function DateTime() {
  const [defaultValue, setDefaultValue] = useState({
    start: new Date("2024-04-01T00:45:00.000Z"),
    end: new Date("2024-04-08T11:15:00.000Z"),
  });

  useEffect(() => {
    async function fetchDateRange() {
      try {
        const res = await fetch('/api/admin/datetime');
        const data = await res.json();
        if (data.event) {
          setDefaultValue({
            start: new Date(data.event.start),
            end: new Date(data.event.end),
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
      const res = await fetch('/api/admin/datetime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start: defaultValue.start.toISOString(), // Convert to ISO string
          end: defaultValue.end.toISOString(),     // Convert to ISO string
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
        onChange={(value) => {
          setDefaultValue({
            start: new Date(value.start),
            end: new Date(value.end),
          });
        }}
      />
      <Button onPress={handleSave}>Tallenna</Button>
    </div>
  );
}
