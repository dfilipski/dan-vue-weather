import axios from 'axios'

export interface Weather {
    main: {
        temp: number,
        humidity: number,
        pressure: number,
    };
    weather: {
        description: string,
        icon: string,
    }[];
    name: string;
    sys: {
        country: string,
    };
}
const apiKey = import.meta.env.VITE_WEATHER_API_KEY


export async function getWeather(city: string): Promise<Weather> {
    if (!apiKey) {
        throw new Error('API key not found');
    }

    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather' // ?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get<Weather>(baseUrl, {
            params: {
                q: city,
                appid: apiKey,
                units: 'imperial',
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