import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { getCurrentWeather } from '@/entities/weather/api';
import { CurrentWeather } from '@/entities/weather/types';
import SearchBar from '@/features/weather/ui/SearchBar/SearchBar';
import WeatherCard from '@/features/weather/ui/WeatherCard/WeatherCard';
import LoadingSpinner from '@/shared/ui/Loader/LoadingSpinner';

const Home: React.FC = () => {
	const [weatherData, setWeatherData] = useState<CurrentWeather | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	
	const handleCitySelect = async (city: string) => {
		setLoading(true);
		setError('');
		try {
			const data = await getCurrentWeather(city);
			setWeatherData(data);
		} catch (err: any) {
			setError(err.response?.data?.message || 'Ошибка при получении данных');
			setWeatherData(null);
		}
		setLoading(false);
	};
	
	return (
		<Container className="mt-4">
			<SearchBar onCitySelect={handleCitySelect} />
			{loading && <LoadingSpinner />}
			{error && <Alert variant="danger" className="mt-3">{error}</Alert>}
			{weatherData && !loading && !error && (
				<div className="mt-3">
					<WeatherCard weatherData={weatherData} />
				</div>
			)}
		</Container>
	);
};

export default Home;
