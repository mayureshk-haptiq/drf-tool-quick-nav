import { useEffect } from 'react';
import { tryPostToolChangedHeight } from '@/utils/toolBridge';

const BOTTOM_PAD_PX = 6;

function measureContentHeight(root: HTMLElement): number {
	const rect = root.getBoundingClientRect();
	const scrollH = root.scrollHeight;
	const blockH = Math.max(rect.height, scrollH);
	return Math.ceil(blockH + BOTTOM_PAD_PX);
}

/**
 * Reports iframe height to the Visual Editor so the shell matches tool content
 * ([Storyblok docs](https://www.storyblok.com/docs/plugins/tool-plugins#integrating-with-the-visual-editor)).
 * Observes `<main>` so height tracks the nav list (including expand/collapse).
 */
export const useToolIframeHeight = () => {
	useEffect(() => {
		const getRoot = (): HTMLElement | null =>
			document.querySelector('main') ?? document.body;

		let raf = 0;
		const postHeight = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				const el = getRoot();
				if (!el) {
					return;
				}
				tryPostToolChangedHeight(measureContentHeight(el));
			});
		};

		postHeight();

		const el = getRoot();
		if (!el) {
			return;
		}

		const resizeObserver = new ResizeObserver(() => postHeight());
		resizeObserver.observe(el);

		window.addEventListener('resize', postHeight);

		// Auth swap / fonts can finish after first paint; Collapse uses transitions
		const t0 = window.setTimeout(postHeight, 0);
		const t1 = window.setTimeout(postHeight, 150);
		const t2 = window.setTimeout(postHeight, 400);

		return () => {
			cancelAnimationFrame(raf);
			window.clearTimeout(t0);
			window.clearTimeout(t1);
			window.clearTimeout(t2);
			resizeObserver.disconnect();
			window.removeEventListener('resize', postHeight);
		};
	}, []);
};
