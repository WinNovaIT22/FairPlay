'use client'

import { useState, useEffect } from 'react';

const Temperature = () => {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const res = await fetch("/api/temperature");
        const data = await res.json();
        setTemperature(data.temperature);
      } catch (error) {
        console.error("Error fetching temperature:", error);
      }
    };

    fetchTemperature();
  }, []);

  return (
    <>
      <div>
        {temperature}
      </div>
    </>
  );
};

export default Temperature;
