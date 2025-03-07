import React, { useCallback, useState } from "react";
import { Container, Alert } from "react-bootstrap";
import { getCurrentWeather } from "@/entities/weather/api";
import { CurrentWeather } from "@/entities/weather/types";
import SearchBar from "@/features/weather/ui/SearchBar/SearchBar";
import WeatherCard from "@/features/weather/ui/WeatherCard/WeatherCard";
import LoadingSpinner from "@/shared/ui/Loader/LoadingSpinner";

const Home: React.FC = () => {
	const [weatherData, setWeatherData] = useState<CurrentWeather | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	
	const handleSearch = useCallback(async (city: string) => {
		setLoading(true);
		setError("");
		try {
			const data = await getCurrentWeather(city);
			setWeatherData(data);
		} catch (err: any) {
			setError("Ошибка при получении прогноза");
			setWeatherData(null);
		} finally {
			setLoading(false);
		}
	}, []);
	
	const clearError = useCallback(() => {
		setError("");
	}, []);
	
	return (
		<Container className="mt-4">
			<SearchBar
				onSearch={handleSearch}
				error={error || undefined}
				loading={loading}
				onClearError={clearError}
			/>
			
			{loading && <LoadingSpinner />}
			
			{weatherData && !loading && !error && (
				<WeatherCard weatherData={weatherData} />
			)}
		</Container>
	);
};

export default Home;
