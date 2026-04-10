import type {
	ToolChangedHeightPayload,
	ToolChangedNavigatePayload,
} from '@/types';
import {
	KEY_PARENT_HOST,
	KEY_SLUG,
	TOOL_PLUGIN_SLUG,
} from '@/utils/const';

/**
 * Storyblok passes the extension slug as `slug` and stores it after App Bridge validate.
 * Height updates are ignored if `tool` does not match the installed extension slug.
 */
export const getToolSlugForPostMessage = (): string => {
	if (typeof window === 'undefined') {
		return TOOL_PLUGIN_SLUG;
	}
	try {
		const stored = sessionStorage.getItem(KEY_SLUG);
		if (stored) {
			return stored;
		}
	} catch {
		// sessionStorage unavailable
	}
	const q = new URLSearchParams(window.location.search).get('slug');
	if (q) {
		return q;
	}
	return TOOL_PLUGIN_SLUG;
};

const getParentHost = (): string => {
	const storedHost = sessionStorage.getItem(KEY_PARENT_HOST);
	if (storedHost) {
		return storedHost;
	}
	const params = new URLSearchParams(location.search);
	const protocol = params.get('protocol');
	const host = params.get('host');
	if (!protocol || !host) {
		throw new Error('Missing `protocol` or `host` in query params');
	}
	return `${protocol}//${host}`;
};

export const postToolChangedNavigate = (url: string) => {
	const payload: ToolChangedNavigatePayload = {
		action: 'tool-changed',
		tool: getToolSlugForPostMessage(),
		event: 'navigate',
		url,
	};
	window.parent.postMessage(payload, getParentHost());
};

/**
 * Visual Editor listens for height on the parent window. Storyblok docs use `'*'` as targetOrigin
 * so delivery is reliable; `tool` must match the extension slug.
 */
export const postToolChangedHeight = (height: number) => {
	const payload: ToolChangedHeightPayload = {
		action: 'tool-changed',
		tool: getToolSlugForPostMessage(),
		event: 'heightChange',
		height: Math.max(1, Math.round(height)),
	};
	window.parent.postMessage(payload, '*');
};

/**
 * Height helper: always posts (no parent-host dependency).
 */
export const tryPostToolChangedHeight = (height: number) => {
	postToolChangedHeight(height);
};

export const tryPostToolChangedNavigate = (url: string) => {
	try {
		postToolChangedNavigate(url);
	} catch {
		// no-op
	}
};
