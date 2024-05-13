"use client"

import { useState, useEffect } from 'react';

const Temperature = () => {
  const [temperature, setTemperature] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherIcon, setWeatherIcon] = useState(null);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const res = await fetch("/api/temperature");
        const data = await res.json();
        setTemperature(data.temperature);
        setCity(data.city);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching temperature:", error);
        setLoading(false);
      }
    };

    fetchTemperature();
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <div>Ladataan säätä...</div>
        ) : (
          <div>
            <span>{temperature}, {city}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Temperature;
