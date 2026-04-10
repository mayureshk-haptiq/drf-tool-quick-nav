export const KEY_PREFIX = 'sb_ab';
export const KEY_TOKEN = `${KEY_PREFIX}_token`;
export const KEY_VALIDATED_PAYLOAD = `${KEY_PREFIX}_validated_payload`;
export const KEY_PARENT_HOST = `${KEY_PREFIX}_parent_host`;
export const KEY_SLUG = `${KEY_PREFIX}_slug`;

export const APP_BRIDGE_TOKEN_HEADER_KEY = 'sb_app_bridge_token';

export const APP_BRIDGE_ORIGIN = 'https://app.storyblok.com';

/** Must match the Tool extension slug in Storyblok (override per deploy if needed). */
export const TOOL_PLUGIN_SLUG =
	process.env.NEXT_PUBLIC_TOOL_SLUG ?? 'storyblok-quick-nav';
