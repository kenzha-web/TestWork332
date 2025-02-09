import React, {memo, useCallback, useEffect, useState} from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import { getCitySuggestions } from '@/entities/weather/api';
import { CitySuggestion } from '@/entities/weather/types';
import { debounce } from '@/shared/lib/debounce/debounce';

interface CityAutocompleteProps {
	query: string;
	onSelect: (city: string) => void;
	disabled?: boolean;
	onError?: (error: string | null) => void;
}

const CityAutocomplete: React.FC<CityAutocompleteProps> = ({query, onSelect, disabled, onError}) => {
	const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	
	const fetchSuggestions = useCallback(async (q: string) => {
		if (!q || disabled) {
			setSuggestions([]);
			setError(null);
			if (onError) onError(null);
			return;
		}
		
		setLoading(true);
		setError(null);
		if (onError) onError(null);
		
		try {
			const data = await getCitySuggestions(q);
			setSuggestions(data);
			if (data.length === 0) {
				setError('Ничего не найдено');
				if (onError) onError('Ничего не найдено');
			}
		} catch (error) {
			console.error(error);
			setError('Не удалось загрузить подсказки');
			if (onError) onError('Не удалось загрузить подсказки');
		} finally {
			setLoading(false);
		}
	}, []);
	
	const debouncedFetch = debounce(fetchSuggestions, 500);
	
	useEffect(() => {
		debouncedFetch(query);
	}, [query, disabled]);
	
	if (!query || disabled) return null;
	
	return (
		<div className="mt-2">
			{loading && <div>Загрузка...</div>}
			
			{error && (
				<Alert variant="warning" className="mt-2">
					{error}
				</Alert>
			)}
			
			{!error && suggestions.length > 0 && (
				<ListGroup>
					{suggestions.map((city) => (
						<ListGroup.Item
							key={`${city.name}-${city.lat}-${city.lon}`}
							action
							onClick={() => onSelect(city.name)}
							disabled={disabled}
						>
							{city.name}, {city.state ? city.state + ', ' : ''}{city.country}
						</ListGroup.Item>
					))}
				</ListGroup>
			)}
		</div>
	);
};

export default memo(CityAutocomplete);