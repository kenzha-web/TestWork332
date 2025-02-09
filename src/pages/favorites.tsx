import React, { useEffect, useState } from 'react';
import { Container, Alert, Row, Col } from 'react-bootstrap';
import { getCurrentWeather } from '@/entities/weather/api';
import { CurrentWeather } from '@/entities/weather/types';
import { useWeatherStore } from '@/shared/store/useWeatherStore';
import WeatherCard from '@/features/weather/ui/WeatherCard/WeatherCard';
import LoadingSpinner from '@/shared/ui/Loader/LoadingSpinner';

const Favorites: React.FC = () => {
	const { favorites } = useWeatherStore();
	const [favoritesData, setFavoritesData] = useState<CurrentWeather[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	
	useEffect(() => {
		const fetchFavorites = async () => {
			setLoading(true);
			setError('');
			try {
				const requests = favorites.map((city) => getCurrentWeather(city));
				const responses = await Promise.all(requests);
				setFavoritesData(responses);
			} catch (err: any) {
				setError('Ошибка при получении данных избранных городов');
			}
			setLoading(false);
		};
		
		if (favorites.length > 0) {
			fetchFavorites();
		} else {
			setFavoritesData([]);
		}
	}, [favorites]);
	
	return (
		<Container className="mt-4">
			<h2>Избранные города</h2>
			{loading && <LoadingSpinner />}
			{error && <Alert variant="danger">{error}</Alert>}
			{!loading && favoritesData.length === 0 && <p>Нет избранных городов.</p>}
			<Row className="mt-3">
				{favoritesData.map((data) => (
					<Col key={data.id} xs={12} md={6} lg={4} className="mb-3">
						<WeatherCard weatherData={data} />
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default Favorites;
