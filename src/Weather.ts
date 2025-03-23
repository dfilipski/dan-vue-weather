
export interface Weather {
    main: {
        temp: number;
        humidity: number;
        pressure: number;
    };
    weather: {
        id: number;
        description: string;
        icon: string;
    }[];
    name: string;
    sys: {
        country: string;
    };
}
