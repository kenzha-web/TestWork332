import React, { memo, useCallback } from 'react';
import Image from 'next/image';
import { Card, Button } from 'react-bootstrap';
import { useWeatherStore } from '@/shared/store/useWeatherStore';
import { CurrentWeather } from '@/entities/weather/types';
import styles from './WeatherCard.module.scss';

interface WeatherCardProps {
	weatherData: CurrentWeather;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
	const { favorites, addFavorite, removeFavorite } = useWeatherStore();
	const isFavorite = favorites.includes(weatherData.name);
	
	const handleFavoriteToggle = useCallback(() => {
		if (isFavorite) {
			removeFavorite(weatherData.name);
		} else {
			addFavorite(weatherData.name);
		}
	}, [isFavorite, removeFavorite, addFavorite, weatherData.name]);
	
	return (
		<Card className={styles.weatherCard}>
			<Card.Body className="text-center">
				<Card.Title>{weatherData.name}</Card.Title>
				<Card.Subtitle className="mb-2 text-light">
					{weatherData.weather[0].description}
				</Card.Subtitle>
				<p className="card-text">{Math.round(weatherData.main.temp)}°C</p>
				<Image
					src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
					alt="weather icon"
					width={100}
					height={100}
				/>
				<Button
					variant={isFavorite ? 'danger' : 'outline-primary'}
					onClick={handleFavoriteToggle}
					className="mt-2"
				>
					{isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
				</Button>
			</Card.Body>
		</Card>
	);
};

export default memo(WeatherCard);

