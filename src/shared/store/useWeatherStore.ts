import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WeatherStore {
	favorites: string[];
	addFavorite: (city: string) => void;
	removeFavorite: (city: string) => void;
}

export const useWeatherStore = create<WeatherStore>()(
	persist(
		(set, get) => ({
			favorites: [],
			addFavorite: (city: string) =>
				set((state) => ({
					favorites: state.favorites.includes(city) ? state.favorites : [...state.favorites, city],
				})),
			removeFavorite: (city: string) =>
				set((state) => ({
					favorites: state.favorites.filter((fav) => fav !== city),
				})),
		}),
		{ name: "weather-store" }
	)
);
