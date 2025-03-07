import React, {memo} from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { ForecastItem } from "@/entities/weather/types";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface WeatherChartProps {
	forecastData: ForecastItem[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({ forecastData }) => {
	const data = {
		labels: forecastData.map((item) => new Date(item.dt * 1000).toLocaleDateString()),
		datasets: [
			{
				label: "Температура (°C)",
				data: forecastData.map((item) => item.main.temp),
				fill: false,
				borderColor: "#4bc0c0",
				tension: 0.1,
			},
		],
	};
	
	return <Line data={data} />;
};

export default memo(WeatherChart);
