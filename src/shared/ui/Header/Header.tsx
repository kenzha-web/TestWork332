import Link from "next/link";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header: React.FC = () => {
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container>
				<Navbar.Brand as={Link} href="/">
					WeatherApp
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={Link} href="/">Главная</Nav.Link>
						<Nav.Link as={Link} href="/forecast">Детальный прогноз</Nav.Link>
						<Nav.Link as={Link} href="/favorites">Избранное</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;

