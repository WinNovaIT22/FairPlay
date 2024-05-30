"use client"

import { useState, useEffect } from 'react';

const Temperature = () => {
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const res = await fetch("/api/temperature");
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setTemperature(data.temperature);
      } catch (error) {
        console.error("Error fetching temperature:", error);
        setError('Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchTemperature();
  }, []);

  if (loading) {
    return <div>Ladataan säätä...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <span>{temperature}</span>
    </div>
  );
};

export default Temperature;
