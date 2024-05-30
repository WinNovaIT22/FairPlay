import { NextResponse } from 'next/server';

export const config = {
  runtime: 'nodejs', // Explicitly specify that this API route uses nodejs runtime
};

export async function GET(request) {
  try {
    // Get the client's IP address from the request headers
    const clientIP = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for') || 'default_ip';

    // Default location (Pori) coordinates
    let lat = 61.485199;
    let lon = 21.797461;

    if (clientIP && clientIP !== 'default_ip') {
      const geoLocationUrl = `https://ipapi.co/${clientIP}/json/`;
      const geoResponse = await fetch(geoLocationUrl);
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        lat = geoData.latitude || lat;
        lon = geoData.longitude || lon;
      }
    }

    // Fetch weather data
    const weatherApiKey = '90c5dc485db6e1a5600dcfe2f1fe013d';
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`;
    const weatherResponse = await fetch(weatherApiUrl);
    const weatherData = await weatherResponse.json();
    const temperature = Math.round(weatherData.main.temp);

    // Fetch city name
    const geocodingApiKey = '6320f548ede74a90abe7b29b69d2d231';
    const geocodingApiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${geocodingApiKey}&q=${lat}+${lon}&pretty=1&no_annotations=1`;
    const geocodingResponse = await fetch(geocodingApiUrl);
    const geocodingData = await geocodingResponse.json();
    const cityName = geocodingData.results[0].components.city || 'Unknown location';

    // Construct the response object
    const responseData = {
      temperature: `${temperature}°C`,
      city: cityName,
    };

    // Set headers to prevent caching
    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0',
    };

    return new NextResponse(JSON.stringify(responseData), { headers });
  } catch (error) {
    console.error('Error fetching temperature:', error);
    return new NextResponse('Failed to fetch temperature', { status: 500 });
  }
}
