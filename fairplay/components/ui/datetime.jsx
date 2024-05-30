"use client"

import React, { useState, useEffect } from "react";
import { DateRangePicker } from "@nextui-org/react";
import { parseZonedDateTime, ZonedDateTime } from "@internationalized/date";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const zonedDateTimeToString = (zonedDateTime) => {
  if (zonedDateTime instanceof ZonedDateTime) {
    return zonedDateTime.toString();
  }
  return zonedDateTime;
};

export default function DateTime() {
  const [dates, setDates] = useState({
    start: "2024-04-01T00:45[Europe/Helsinki]",
    end: "2024-04-08T11:15[Europe/Helsinki]",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await fetch("/api/admin/datetime");
        const data = await response.json();
        if (response.ok && data.event) {
          setDates({
            start: data.event.start,
            end: data.event.end,
          });
        }
      } catch (error) {
        console.error("Error fetching event dates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDates();
  }, []);

  const notify = () => toast.success("Kilpailun kesto päivitetty");

  const handleSave = async () => {
    try {
      const response = await fetch("/api/admin/datetime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dates),
      });
      if (response.ok) {
        notify();
      } else {
        alert("Error saving event");
      }
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Error saving event");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-xl flex flex-row gap-4">
      <DateRangePicker
        label="Kilpailun kesto"
        hideTimeZone
        visibleMonths={2}
        defaultValue={{
          start: parseZonedDateTime(dates.start),
          end: parseZonedDateTime(dates.end),
        }}
        onChange={(range) => setDates({
          start: zonedDateTimeToString(range.start),
          end: zonedDateTimeToString(range.end),
        })}
      />
      <button onClick={handleSave} className="text-white">
        Tallenna
      </button>
    </div>
  );
}
