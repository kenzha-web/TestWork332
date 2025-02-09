import './styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Header from '@/shared/ui/Header/Header';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Header />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
