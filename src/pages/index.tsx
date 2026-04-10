import Head from 'next/head';
import { Box, Typography } from '@mui/material';
import { useAppBridge } from '@/hooks';
import NavigationPanel from '@/components/NavigationPanel';

export default function Home() {
	const { completed } = useAppBridge({ type: 'tool-plugin', oauth: true });

	return (
		<>
			<Head>
				<title>Quick Navigation</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<main data-sb-tool-main>
				{completed ? (
					<NavigationPanel />
				) : (
					<Box sx={{ px: 2, py: 1.5 }}>
						<Typography variant="body2" color="text.secondary">
							Connecting…
						</Typography>
					</Box>
				)}
			</main>
		</>
	);
}
