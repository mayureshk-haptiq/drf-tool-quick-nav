import { Box, List, Typography } from '@mui/material';
import { NAV_ITEMS } from '@/utils/navigation';
import NavItem from './NavItem';

export default function NavigationPanel() {
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
					Links open in a new tab (browser may use a new window instead)
				</Typography>
			</Box>

			<List component="nav" disablePadding sx={{ px: 0.25, pb: 1 }}>
				{NAV_ITEMS.map((item) => (
					<NavItem key={item.id} item={item} />
				))}
			</List>
		</Box>
	);
}
