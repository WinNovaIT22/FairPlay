import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        // Get the client's IP address from the request headers
        const clientIP = request.headers.get("x-real-ip");

        // If clientIP is null, fallback to a default location (e.g., Pori)
        let lat = 61.485199;
        let lon = 21.797461;

        // If the clientIP is available, attempt to get the client's geolocation
        if (clientIP) {
            const geoLocationUrl = `https://ipapi.co/${clientIP}/json/`;
            const geoResponse = await fetch(geoLocationUrl);
            const geoData = await geoResponse.json();

            // Extract latitude and longitude from the geolocation data
            lat = geoData.latitude;
            lon = geoData.longitude;
        }

        // Use the obtained latitude and longitude to fetch weather data and city name
        const weatherApiKey = '90c5dc485db6e1a5600dcfe2f1fe013d';
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`;
        const weatherResponse = await fetch(weatherApiUrl);
        const weatherData = await weatherResponse.json();
        const temperature = Math.round(weatherData.main.temp);
        const weatherCondition = weatherData.weather[0].main.toLowerCase();

        // Determine which image to use based on the weather condition
        let weatherImage;
        switch (weatherCondition) {
            case 'clear':
            case 'sunny':
                weatherImage = 'sun.png';
                break;
            case 'clouds':
                weatherImage = 'cloudy.png';
                break;
            case 'rain':
                weatherImage = 'rainy.png';
                break;
            default:
                weatherImage = 'default.png';
                break;
        }

        // Use latitude and longitude to fetch city name
        const geocodingApiKey = '6320f548ede74a90abe7b29b69d2d231';
        const geocodingApiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${geocodingApiKey}&q=${lat}+${lon}&pretty=1&no_annotations=1`;
        const geocodingResponse = await fetch(geocodingApiUrl);
        const geocodingData = await geocodingResponse.json();
        const cityName = geocodingData.results[0].components.city;

        // Construct the response object with temperature, city name, and weather image
        const responseData = {
            temperature: `${temperature}°C`,
            city: cityName,
            weatherImage: weatherImage
        };

        return NextResponse.json(responseData);
    } catch (error) {
        return NextResponse.error(new Error('Failed to fetch temperature'), { status: 500 });
    }
}
