import React, {memo} from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import { ForecastItem } from '@/entities/weather/types';
import {formatDate} from "@/shared/lib/format/format";

interface ForecastListProps {
	forecastData: ForecastItem[];
}

const ForecastList: React.FC<ForecastListProps> = ({ forecastData }) => {
	return (
		<Row className="g-3">
			{forecastData.map((item) => (
				<Col key={item.dt} xs={12} md={4}>
					<Card className="text-center">
						<Card.Body>
							<Card.Title>{formatDate(new Date(item.dt * 1000).toLocaleDateString())}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">{item.weather[0].description}</Card.Subtitle>
							<p>{Math.round(item.main.temp)}°C</p>
							<Image
								src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
								alt="icon"
								width={50}
								height={50}
							/>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default memo(ForecastList);
