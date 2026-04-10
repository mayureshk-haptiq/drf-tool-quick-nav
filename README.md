# Storyblok Quick Navigation (Tool Plugin)

A [Storyblok Tool plugin](https://www.storyblok.com/docs/plugins/tool-plugins) for the **Visual Editor**: compact quick links that open stories in the same window via `postMessage` (`tool-changed` / `navigate`), with OAuth and App Bridge. Server routes use the Management API with `accessToken` and `space_id` from the session.

## Slug alignment

The extension **slug** in Storyblok must match every outbound `tool` field. Default: `storyblok-quick-nav` (see `TOOL_PLUGIN_SLUG` in `src/utils/const.ts`). Override at build time with `NEXT_PUBLIC_TOOL_SLUG` if your extension slug differs.

## Navigation

- Items are defined in `src/utils/navigation.ts` with **hardcoded Storyblok URLs** (or switch back to slug/API resolution later).
- Clicking an entry sends `{ action: 'tool-changed', tool, event: 'navigate', url }` with that URL so the Visual Editor navigates in-place.
- Optional API: `GET /api/stories?list=1` (and slug/folder queries) still exists for other use cases.

## Prerequisites

- Content matching the slugs in `src/utils/navigation.ts` (or change that file).
- Tool extension with **App Bridge** and OAuth configured.

## Setup

```shell
cd tool-plugin/storyblok-quick-nav
npm install
```

Tunnel and env (same pattern as other apps in this repo):

```shell
ngrok http 3000
```

Copy `.env.local.example` to `.env.local`:

```
CLIENT_ID=<from extension>
CLIENT_SECRET=<from extension>
BASE_URL=<your public URL>
```

Optional: `NEXT_PUBLIC_TOOL_SLUG=<extension-slug>`

## Storyblok extension (Tool)

1. [Partner Portal](https://app.storyblok.com/#/partner/apps) or org extensions → **New Extension**.
2. Choose type **Tool** (Visual Editor), not Space sidebar.
3. Set **slug** to match `TOOL_PLUGIN_SLUG` / `NEXT_PUBLIC_TOOL_SLUG`.
4. Under **OAuth 2.0 and Pages**: **Index** = `{BASE_URL}`, **Redirect** = `{BASE_URL}/api/connect/callback`.
5. Enable **Use App Bridge**.
6. Install the app on a space; open a story in the Visual Editor and launch the tool from the tools panel.

## Customizing items

Edit `src/utils/navigation.ts`: `label`, `url` (or `children` with `url` per row), and MUI `icon`.

## Tech stack

- Next.js (Pages Router), MUI + `@storyblok/mui`
- `@storyblok/app-extension-auth`, App Bridge (`tool-changed`)
- `ResizeObserver` → `heightChange` for iframe height (see `_app.tsx` + `useToolIframeHeight`)
