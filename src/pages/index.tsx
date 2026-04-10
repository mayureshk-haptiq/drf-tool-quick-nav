import Head from 'next/head';
import { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useAppBridge, useToolIframeHeight } from '@/hooks';
import NavigationPanel from '@/components/NavigationPanel';

export default function Home() {
	const { completed } = useAppBridge({ type: 'tool-plugin', oauth: true });
	const toolContentRef = useRef<HTMLDivElement>(null);
	useToolIframeHeight(toolContentRef);

	return (
		<>
			<Head>
				<title>Quick Navigation</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<main data-sb-tool-main>
				<Box
					ref={toolContentRef}
					sx={{
						width: '100%',
						minHeight: 0,
						display: 'block',
						overflow: 'visible',
					}}
				>
					{completed ? (
						<NavigationPanel />
					) : (
						<Box sx={{ px: 2, py: 1.5 }}>
							<Typography variant="body2" color="text.secondary">
								Connecting…
							</Typography>
						</Box>
					)}
				</Box>
			</main>
		</>
	);
}
