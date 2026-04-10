import { useState } from 'react';
import {
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Collapse,
	List,
	Box,
	Chip,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import type { NavItemConfig } from '@/utils/navigation';

type NavItemProps = {
	item: NavItemConfig;
	onNavigate: (url: string) => void;
	loadingUrl: string | null;
};

export default function NavItem({
	item,
	onNavigate,
	loadingUrl,
}: NavItemProps) {
	const [open, setOpen] = useState(false);
	const Icon = item.icon;
	const hasChildren = Boolean(item.children?.length);
	const itemUrl = item.url;
	const isBusy = itemUrl != null && loadingUrl === itemUrl;

	const handleClick = () => {
		if (hasChildren) {
			setOpen((prev) => !prev);
		} else if (itemUrl) {
			onNavigate(itemUrl);
		}
	};

	return (
		<>
			<ListItemButton
				onClick={handleClick}
				disabled={isBusy}
				sx={{
					py: 0.65,
					px: 1.25,
					mx: 0.5,
					my: 0.1,
					borderRadius: 1.5,
					transition: 'background-color 0.15s ease',
					'&:hover': {
						backgroundColor: 'action.hover',
					},
				}}
			>
				<ListItemIcon sx={{ minWidth: 28 }}>
					<Icon sx={{ fontSize: 18, color: 'primary.main' }} />
				</ListItemIcon>
				<ListItemText
					primary={item.label}
					primaryTypographyProps={{
						fontSize: 13,
						fontWeight: 500,
						letterSpacing: '-0.01em',
					}}
				/>
				{hasChildren ? (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
						<Chip
							label={item.children!.length}
							size="small"
							sx={{
								height: 18,
								fontSize: 10,
								fontWeight: 600,
								backgroundColor: 'primary.50',
								color: 'primary.main',
								'& .MuiChip-label': { px: 0.5 },
							}}
						/>
						{open ? (
							<ExpandLess sx={{ fontSize: 18, color: 'text.secondary' }} />
						) : (
							<ExpandMore sx={{ fontSize: 18, color: 'text.secondary' }} />
						)}
					</Box>
				) : (
					<OpenInNewIcon
						sx={{
							fontSize: 14,
							color: 'text.disabled',
							opacity: 0,
							transition: 'opacity 0.15s ease',
							'.MuiListItemButton-root:hover &': { opacity: 1 },
						}}
					/>
				)}
			</ListItemButton>

			{hasChildren && (
				<Collapse in={open} timeout={200}>
					<List disablePadding sx={{ pb: 0.5 }}>
						{item.children!.map((child) => (
							<ListItemButton
								key={child.id}
								onClick={() => onNavigate(child.url)}
								disabled={loadingUrl === child.url}
								sx={{
									py: 0.5,
									pl: 4.5,
									pr: 1.25,
									mx: 0.5,
									borderRadius: 1.25,
									transition: 'background-color 0.15s ease',
									'&:hover': {
										backgroundColor: 'action.hover',
									},
								}}
							>
								<Box
									sx={{
										width: 5,
										height: 5,
										borderRadius: '50%',
										backgroundColor: 'text.disabled',
										mr: 1.5,
										flexShrink: 0,
									}}
								/>
								<ListItemText
									primary={child.label}
									primaryTypographyProps={{
										fontSize: 12,
										fontWeight: 400,
										color: 'text.secondary',
									}}
								/>
								<OpenInNewIcon
									sx={{
										fontSize: 12,
										color: 'text.disabled',
										opacity: 0,
										transition: 'opacity 0.15s ease',
										'.MuiListItemButton-root:hover &': { opacity: 1 },
									}}
								/>
							</ListItemButton>
						))}
					</List>
				</Collapse>
			)}
		</>
	);
}
