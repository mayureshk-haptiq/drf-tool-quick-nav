import { useCallback, useState } from 'react';
import { Alert, Box, List, Typography } from '@mui/material';
import { NAV_ITEMS } from '@/utils/navigation';
import NavItem from './NavItem';

export default function NavigationPanel() {
	const [openError, setOpenError] = useState<string | null>(null);

	const openInNewTab = useCallback((url: string) => {
		setOpenError(null);
		const win = window.open(url, '_blank', 'noopener,noreferrer');
		if (win == null) {
			setOpenError(
				'Could not open a new tab. Allow pop-ups for this site or try again.',
			);
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
					Opens each story in a new browser tab
				</Typography>
			</Box>

			{openError && (
				<Alert
					severity="warning"
					sx={{ mx: 1, mb: 1, py: 0 }}
					onClose={() => setOpenError(null)}
				>
					{openError}
				</Alert>
			)}

			<List component="nav" disablePadding sx={{ px: 0.25, pb: 1 }}>
				{NAV_ITEMS.map((item) => (
					<NavItem key={item.id} item={item} onNavigate={openInNewTab} />
				))}
			</List>
		</Box>
	);
}
