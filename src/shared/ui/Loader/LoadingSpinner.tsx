import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner: React.FC = () => (
	<div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
		<Spinner animation="border" role="status">
			<span className="visually-hidden">Загрузка...</span>
		</Spinner>
	</div>
);

export default LoadingSpinner;
