import { useEffect } from 'react';

export default function Error401() {
	useEffect(() => {
		if (typeof window !== 'undefined' && window.top === window.self) {
			window.location.assign('https://app.storyblok.com/oauth/app_redirect');
		}
	}, []);

	return <div></div>;
}
