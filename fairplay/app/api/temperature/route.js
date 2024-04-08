import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = '60fb977227cd6b1412566a3a4e027c3f';
    const city = 'Pori';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=61.485199&lon=21.797461&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const temperature = Math.round(data.main.temp);

    return NextResponse.json({ temperature: `${temperature}°C` });
} catch (error) {
    return NextResponse.error(new Error('Failed to fetch temperature'), { status: 500 });
  }
}
