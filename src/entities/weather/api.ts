import axios from 'axios';
import { CurrentWeather, ForecastItem, CitySuggestion } from './types';
import {API_KEY, BASE_URL} from "@/shared/const/constant";

export async function getCurrentWeather(city: string): Promise<CurrentWeather> {
	const response = await axios.get<CurrentWeather>(`${BASE_URL}/data/2.5/weather`, {
		params: {
			q: city,
			appid: API_KEY,
			units: 'metric',
		},
	});
	return response.data;
}

export async function getForecast(city: string): Promise<ForecastItem[]> {
	const response = await axios.get<{ list: ForecastItem[] }>(`${BASE_URL}/data/2.5/forecast`, {
		params: {
			q: city,
			appid: API_KEY,
			units: 'metric',
		},
	});
	return response.data.list.filter((item) => item.dt_txt.includes('12:00:00'));
}

export async function getCitySuggestions(query: string): Promise<CitySuggestion[]> {
	const response = await axios.get<CitySuggestion[]>(`${BASE_URL}/geo/1.0/direct`, {
		params: {
			q: query,
			limit: 5,
			appid: API_KEY,
		},
	});
	return response.data;
}
