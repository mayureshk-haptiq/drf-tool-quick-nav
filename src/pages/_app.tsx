import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import { lightTheme } from '@storyblok/mui';
import { useToolIframeHeight } from '@/hooks';

function ToolIframeHeightSync() {
	useToolIframeHeight();
	return null;
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={lightTheme}>
			<ToolIframeHeightSync />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
