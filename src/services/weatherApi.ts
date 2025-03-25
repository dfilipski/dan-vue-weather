import axios from 'axios'
import type { Weather } from '../types/Weather';
import type { Units } from '../types/Units';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY


export async function getWeather(city: string, units: Units): Promise<Weather> {
    if (!apiKey) {
        throw new Error('API key not found');
    }

    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather' // ?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get<Weather>(baseUrl, {
            params: {
                q: city,
                appid: apiKey,
                units: units,
            }
        });

        console.log(`Got: {${response.data.name}, ${response.data.main.temp}ºF, ${response.data.main.humidity}%, ${response.data.weather[0].description}}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`API Error: ${error.response?.data.message || error.message}`);
        }
        else {
            throw new Error(`An unexpected error occurred`);
        }
    }
}