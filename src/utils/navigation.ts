import HomeIcon from '@mui/icons-material/Home';
import TuneIcon from '@mui/icons-material/Tune';
import ArticleIcon from '@mui/icons-material/Article';
import PetsIcon from '@mui/icons-material/Pets';
import EventIcon from '@mui/icons-material/Event';
import type { SvgIconComponent } from '@mui/icons-material';

export type NavChild = {
	id: string;
	label: string;
	url: string;
};

export type NavItemConfig = {
	id: string;
	label: string;
	icon: SvgIconComponent;
	/** Set for a single link; omit when using `children` only. */
	url?: string;
	children?: NavChild[];
};

/** Hardcoded Storyblok app URLs (temporary). */
export const NAV_ITEMS: NavItemConfig[] = [
	{
		id: 'home',
		label: 'Home',
		url: 'https://app.storyblok.com/#/me/spaces/568691278621751/stories/0/0/92172140475593',
		icon: HomeIcon,
	},
	{
		id: 'tracks-manager',
		label: 'Tracks Manager',
		url: 'https://app.storyblok.com/#/me/spaces/568691278621751/stories/0/0/138580084947608',
		icon: TuneIcon,
	},
	{
		id: 'article-manager',
		label: 'Article Manager',
		url: 'https://app.storyblok.com/#/me/spaces/568691278621751/stories/0/0/161588601757765',
		icon: ArticleIcon,
	},
	{
		id: 'breeding',
		label: 'Breeding',
		url: 'https://app.storyblok.com/#/me/spaces/568691278621751/stories/0/0/155834633458787',
		icon: PetsIcon,
	},
	{
		id: 'events',
		label: 'Events',
		icon: EventIcon,
		children: [
			{
				id: 'belmont-stakes',
				label: 'Belmont Stakes',
				url: 'https://app.storyblok.com/#/me/spaces/568691278621751/stories/0/0/99602292355888',
			},
			{
				id: 'derby-watch',
				label: 'Derby Watch',
				url: 'https://app.storyblok.com/#/me/spaces/568691278621751/stories/0/0/142130606598241',
			},
		],
	},
];
