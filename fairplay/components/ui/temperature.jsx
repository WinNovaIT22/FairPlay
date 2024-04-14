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

        const weatherCondition = data.weatherCondition.toLowerCase();
        let icon;
        switch (weatherCondition) {
          case 'sunny':
            icon = 'sun.png';
            break;
          case 'cloudy':
            icon = 'cloud.png';
            break;
          case 'rainy':
            icon = 'rain.png';
            break;
          default:
            icon = 'default.png';
            break;
        }
        setWeatherIcon(icon);
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
            <img src={`/images/${weatherIcon}`} alt="Weather icon" />
            <span>{temperature}, {city}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Temperature;
