import { type RefObject, useLayoutEffect } from 'react';
import { tryPostToolChangedHeight } from '@/utils/toolBridge';

const BOTTOM_PAD_PX = 8;

function measureScrollableHeight(el: HTMLElement): number {
	return Math.ceil(
		Math.max(
			el.scrollHeight,
			el.offsetHeight,
			el.getBoundingClientRect().height,
		) + BOTTOM_PAD_PX,
	);
}

/**
 * Reports iframe height from a content wrapper so Storyblok can resize `.tool__iframe`.
 * Observes the element with ResizeObserver (list growth, MUI Collapse, auth swap).
 *
 * @see https://www.storyblok.com/docs/plugins/tool-plugins#integrating-with-the-visual-editor
 */
export const useToolIframeHeight = (contentRef: RefObject<HTMLElement | null>) => {
	useLayoutEffect(() => {
		let raf = 0;
		let cancelled = false;

		const postHeight = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				if (cancelled) {
					return;
				}
				const el = contentRef.current;
				if (!el) {
					return;
				}
				tryPostToolChangedHeight(measureScrollableHeight(el));
			});
		};

		const el = contentRef.current;
		if (!el) {
			return;
		}

		postHeight();

		const resizeObserver = new ResizeObserver(() => postHeight());
		resizeObserver.observe(el);

		window.addEventListener('resize', postHeight);

		const t0 = window.setTimeout(postHeight, 0);
		const t1 = window.setTimeout(postHeight, 200);
		const t2 = window.setTimeout(postHeight, 450);
		const t3 = window.setTimeout(postHeight, 700);

		return () => {
			cancelled = true;
			cancelAnimationFrame(raf);
			window.clearTimeout(t0);
			window.clearTimeout(t1);
			window.clearTimeout(t2);
			window.clearTimeout(t3);
			resizeObserver.disconnect();
			window.removeEventListener('resize', postHeight);
		};
	}, [contentRef]);
};
