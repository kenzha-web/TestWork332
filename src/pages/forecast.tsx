import React, { useCallback, useState } from 'react';
import { Container } from 'react-bootstrap';
import { getForecast } from '@/entities/weather/api';
import { ForecastItem } from '@/entities/weather/types';
import SearchBar from '@/features/weather/ui/SearchBar/SearchBar';
import ForecastList from '@/features/weather/ui/ForecastList/ForecastList';
import WeatherChart from '@/features/weather/ui/WeatherChart/WeatherChart';
import LoadingSpinner from '@/shared/ui/Loader/LoadingSpinner';

const Forecast: React.FC = () => {
	const [forecastData, setForecastData] = useState<ForecastItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	
	const handleCitySelect = useCallback(async (city: string) => {
		setLoading(true);
		setError('');
		try {
			const data = await getForecast(city);
			setForecastData(data);
		} catch (err: any) {
			setError('Ошибка при получении прогноза');
			setForecastData([]);
		}
		setLoading(false);
	}, []);
	
	const clearError = useCallback(() => {
		setError('');
	}, []);
	
	return (
		<Container className="mt-4">
			<SearchBar
				onSearch={handleCitySelect}
				error={error || undefined}
				loading={loading}
				onClearError={clearError}
			/>
			
			{loading && <LoadingSpinner />}
			
			{forecastData.length > 0 && (
				<>
					<div className="mt-3">
						<ForecastList forecastData={forecastData} />
					</div>
					<div className="mt-3">
						<WeatherChart forecastData={forecastData} />
					</div>
				</>
			)}
		</Container>
	);
};

export default Forecast;
