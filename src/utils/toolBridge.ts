import type {
	ToolChangedHeightPayload,
	ToolChangedNavigatePayload,
} from '@/types';
import { KEY_PARENT_HOST, TOOL_PLUGIN_SLUG } from '@/utils/const';

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
		tool: TOOL_PLUGIN_SLUG,
		event: 'navigate',
		url,
	};
	window.parent.postMessage(payload, getParentHost());
};

export const postToolChangedHeight = (height: number) => {
	const payload: ToolChangedHeightPayload = {
		action: 'tool-changed',
		tool: TOOL_PLUGIN_SLUG,
		event: 'heightChange',
		height,
	};
	window.parent.postMessage(payload, getParentHost());
};

/**
 * Same as post helpers but skips if parent origin is not yet known (e.g. before iframe params load).
 */
export const tryPostToolChangedHeight = (height: number) => {
	try {
		postToolChangedHeight(height);
	} catch {
		// no-op
	}
};

export const tryPostToolChangedNavigate = (url: string) => {
	try {
		postToolChangedNavigate(url);
	} catch {
		// no-op
	}
};
