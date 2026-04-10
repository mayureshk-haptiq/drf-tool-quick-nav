import { getAppSession, verifyAppBridgeHeader } from '@/utils/server';
import type { NextApiRequest, NextApiResponse } from 'next';

const getApiBaseUrl = (region?: string): string => {
	switch (region) {
		case 'us':
			return 'https://api-us.storyblok.com/v1';
		case 'ca':
			return 'https://api-ca.storyblok.com/v1';
		case 'ap':
			return 'https://api-ap.storyblok.com/v1';
		case 'cn':
			return 'https://app.storyblokchina.cn/v1';
		case 'eu':
		default:
			return 'https://mapi.storyblok.com/v1';
	}
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const appSession = await getAppSession(req, res);
	if (!appSession || !appSession.accessToken) {
		return res.status(401).json({ error: 'Unauthorized - No OAuth session' });
	}

	const verified = await verifyAppBridgeHeader(req);
	if (!verified.ok || !verified.result) {
		return res
			.status(401)
			.json({ error: 'Unauthorized - No AppBridge session' });
	}

	const { space_id } = verified.result;
	const { accessToken, region } = appSession;
	const apiBaseUrl = getApiBaseUrl(region);

	const folderSlug = req.query.folder_slug as string | undefined;
	const storySlug = req.query.story_slug as string | undefined;
	const listAll = req.query.list === '1' || req.query.list === 'true';

	try {
		if (listAll) {
			const url = `${apiBaseUrl}/spaces/${space_id}/stories?sort_by=name:asc&per_page=100`;
			const response = await fetch(url, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const errorText = await response.text();
				return res.status(response.status).json({
					error: 'Failed to fetch stories',
					details: errorText,
				});
			}

			const data = await response.json();
			const stories = (data.stories || [])
				.filter((s: { is_folder?: boolean }) => !s.is_folder)
				.map((s: { id: number; name: string; slug: string; full_slug: string }) => ({
					id: s.id,
					name: s.name,
					slug: s.slug,
					full_slug: s.full_slug,
				}));

			return res.status(200).json({ stories });
		}

		if (folderSlug) {
			const url = `${apiBaseUrl}/spaces/${space_id}/stories?starts_with=${encodeURIComponent(folderSlug)}/&sort_by=name:asc&per_page=100`;
			const response = await fetch(url, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const errorText = await response.text();
				return res.status(response.status).json({
					error: 'Failed to fetch stories',
					details: errorText,
				});
			}

			const data = await response.json();
			const stories = (data.stories || [])
				.filter((s: any) => !s.is_folder)
				.map((s: any) => ({
					id: s.id,
					name: s.name,
					slug: s.slug,
					full_slug: s.full_slug,
				}));

			return res.status(200).json({ stories });
		}

		if (storySlug) {
			const url = `${apiBaseUrl}/spaces/${space_id}/stories?with_slug=${encodeURIComponent(storySlug)}`;
			const response = await fetch(url, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const errorText = await response.text();
				return res.status(response.status).json({
					error: 'Failed to fetch story',
					details: errorText,
				});
			}

			const data = await response.json();
			const story = data.stories?.[0];
			if (!story) {
				return res.status(404).json({ error: `Story "${storySlug}" not found` });
			}

			return res.status(200).json({
				story: {
					id: story.id,
					name: story.name,
					slug: story.slug,
					full_slug: story.full_slug,
				},
			});
		}

		return res.status(400).json({
			error:
				'Missing query: use folder_slug, story_slug, or list=1 for a paginated space list',
		});
	} catch (error) {
		return res.status(500).json({
			error: 'Internal server error',
			details: error instanceof Error ? error.message : 'Unknown error',
		});
	}
}
