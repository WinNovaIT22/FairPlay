import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET(request) {
  try {
    // Get the client's IP address from the request headers
    const clientIP = headers().get("x-real-ip");

    // Default location (Pori) coordinates
    let lat = 61.485199;
    let lon = 21.797461;

    if (clientIP) {
      try {
        const geoLocationUrl = `https://ipapi.co/${clientIP}/json/`;
        const geoResponse = await fetch(geoLocationUrl);
        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          lat = geoData.latitude || lat;
          lon = geoData.longitude || lon;
        } else {
          console.error('Failed to fetch geolocation:', geoResponse.statusText);
        }
      } catch (geoError) {
        console.error('Error fetching geolocation:', geoError);
      }
    }

    let temperature = null;
    try {
      // Fetch weather data
      const weatherApiKey = '90c5dc485db6e1a5600dcfe2f1fe013d';
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`;
      const weatherResponse = await fetch(weatherApiUrl);
      if (weatherResponse.ok) {
        const weatherData = await weatherResponse.json();
        temperature = Math.round(weatherData.main.temp);
      } else {
        console.error('Failed to fetch weather data:', weatherResponse.statusText);
      }
    } catch (weatherError) {
      console.error('Error fetching weather data:', weatherError);
    }

    // let cityName = 'Unknown location';
    // try {
    //   // Fetch city name
    //   const geocodingApiKey = '6320f548ede74a90abe7b29b69d2d231';
    //   const geocodingApiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${geocodingApiKey}&q=${lat}+${lon}&pretty=1&no_annotations=1`;
    //   const geocodingResponse = await fetch(geocodingApiUrl);
    //   if (geocodingResponse.ok) {
    //     const geocodingData = await geocodingResponse.json();
    //     cityName = geocodingData.results[0].components.city || cityName;
    //   } else {
    //     console.error('Failed to fetch city name:', geocodingResponse.statusText);
    //   }
    // } catch (geocodingError) {
    //   console.error('Error fetching city name:', geocodingError);
    // }

    // Construct the response object
    const responseData = {
      temperature: temperature !== null ? `${temperature}°C` : 'Ei saatavilla',
      // city: cityName,
    };

    // Set headers to prevent caching
    const responseHeaders = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0',
    };

    return new NextResponse(JSON.stringify(responseData), { headers: responseHeaders });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return new NextResponse('Failed to fetch temperature', { status: 500 });
  }
}
