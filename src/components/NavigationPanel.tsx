import { useCallback, useState } from 'react';
import { Alert, Box, List, Typography } from '@mui/material';
import { postToolChangedNavigate } from '@/utils/toolBridge';
import { NAV_ITEMS } from '@/utils/navigation';
import NavItem from './NavItem';

export default function NavigationPanel() {
	const [navError, setNavError] = useState<string | null>(null);
	const [loadingUrl, setLoadingUrl] = useState<string | null>(null);

	const navigateToUrl = useCallback((url: string) => {
		setNavError(null);
		setLoadingUrl(url);
		try {
			postToolChangedNavigate(url);
		} catch (e) {
			setNavError(e instanceof Error ? e.message : 'Navigation failed');
		} finally {
			setLoadingUrl(null);
		}
	}, []);

	return (
		<Box
			sx={{
				width: '100%',
				backgroundColor: '#fafbfc',
			}}
		>
			<Box sx={{ px: 1.5, pt: 1.25, pb: 0.75 }}>
				<Typography
					variant="subtitle2"
					sx={{
						fontWeight: 700,
						fontSize: 13,
						letterSpacing: '-0.02em',
						color: 'text.primary',
					}}
				>
					Quick Navigation
				</Typography>
				<Typography
					variant="caption"
					sx={{ color: 'text.secondary', fontSize: 11, display: 'block' }}
				>
					Open in Visual Editor
				</Typography>
			</Box>

			{navError && (
				<Alert
					severity="error"
					sx={{ mx: 1, mb: 1, py: 0 }}
					onClose={() => setNavError(null)}
				>
					{navError}
				</Alert>
			)}

			<List component="nav" disablePadding sx={{ px: 0.25, pb: 1 }}>
				{NAV_ITEMS.map((item) => (
					<NavItem
						key={item.id}
						item={item}
						onNavigate={navigateToUrl}
						loadingUrl={loadingUrl}
					/>
				))}
			</List>
		</Box>
	);
}
