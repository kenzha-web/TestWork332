import React, {memo, useCallback, useState} from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import CityAutocomplete from "@/widgets/autocomplete/CityAutocomplete";

interface SearchBarProps {
	onSearch: (city: string) => Promise<void>;
	error?: string;
	loading?: boolean;
	onClearError?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, error, loading, onClearError }) => {
	const [query, setQuery] = useState("");
	const [localError, setLocalError] = useState<string | null>(null);
	const [autocompleteError, setAutocompleteError] = useState<string | null>(null);
	
	const handleSubmit = useCallback(async (e: React.FormEvent) => {
		e.preventDefault();
		const trimmedQuery = query.trim();
		
		setLocalError(null);
		setAutocompleteError(null);
		
		if (autocompleteError === "Ничего не найдено") {
			setLocalError("Некорректное название города");
			return;
		}
		
		if (!trimmedQuery) {
			setLocalError("Введите название города");
			return;
		}
		
		try {
			await onSearch(trimmedQuery);
		} catch (err) {
			setLocalError(null);
		}
	}, [query, autocompleteError, onSearch]);
	
	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<InputGroup hasValidation>
					<Form.Control
						type="text"
						placeholder="Введите город"
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
							if (error && onClearError) {
								onClearError();
							}
						}}
						disabled={loading}
						isInvalid={!!localError || !!error}
						aria-describedby="cityHelp"
					/>
					
					<Button
						variant="primary"
						type="submit"
						disabled={loading || autocompleteError === "Ничего не найдено"}
						style={{ minWidth: "100px" }}
					>
						{loading ? (
							<span className="spinner-border spinner-border-sm" role="status" />
						) : "Поиск"}
					</Button>
				</InputGroup>
			</Form>
			
			<div className="mt-2">
				{localError && (
					<Alert variant="danger" className="mb-2">
						{localError}
					</Alert>
				)}
				
				{error && !localError && (
					<Alert variant="danger" className="mb-2">
						{error}
					</Alert>
				)}
			</div>
			
			<CityAutocomplete
				query={query}
				onSelect={(city) => {
					setQuery(city);
					onSearch(city).catch(() => {});
				}}
				disabled={loading}
				onError={(error) => setAutocompleteError(error)}
			/>
		</div>
	);
};

export default memo(SearchBar);
