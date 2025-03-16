export interface WeatherParams {
    latitude: number;
    longitude: number;
    hourly: string;
    timezone: string;
    wind_speed_unit: string;
    temperature_unit: string;
    precipitation_unit: string;
}

export async function getWeatherDataForLocation(params: WeatherParams) {
    return { current: { temperature: 20, weatherCode: 800, windSpeed: 5, windDirection: 180 } }
}

