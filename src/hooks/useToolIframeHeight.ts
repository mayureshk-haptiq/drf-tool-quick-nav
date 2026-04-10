import { useEffect } from 'react';
import { tryPostToolChangedHeight } from '@/utils/toolBridge';

/**
 * Keeps the Visual Editor tool iframe height in sync with content ([Storyblok docs](https://www.storyblok.com/docs/plugins/tool-plugins#integrating-with-the-visual-editor)).
 */
export const useToolIframeHeight = () => {
	useEffect(() => {
		const notify = () => {
			const height = Math.max(
				document.documentElement.scrollHeight,
				document.body.scrollHeight,
			);
			tryPostToolChangedHeight(height);
		};

		notify();

		const observer = new ResizeObserver(() => {
			notify();
		});
		observer.observe(document.body);

		return () => {
			observer.disconnect();
		};
	}, []);
};
