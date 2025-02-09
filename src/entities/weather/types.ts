export interface CurrentWeather {
	id: number;
	name: string;
	main: {
		temp: number;
	};
	weather: {
		description: string;
		icon: string;
	}[];
}

export interface ForecastItem {
	dt: number;
	main: {
		temp: number;
	};
	weather: {
		description: string;
		icon: string;
	}[];
	dt_txt: string;
}

export interface CitySuggestion {
	name: string;
	country: string;
	state?: string;
	lat: number;
	lon: number;
}
