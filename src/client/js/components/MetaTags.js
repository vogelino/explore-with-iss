/* global window */
import React from 'react';
import Helmet from 'react-helmet';

const faviconVersion = 'OmmGnv49vk';
const shortTitle = 'Explore with ISS';
const fullTitle = 'Explore earth along with the International Space Station';
const fullDescription = `A live data visualization to explore and discover` +
	`countries by following ISS in its route ` +
	`| © ${new Date().getFullYear()} by vogelino.com`;
const contentUrl = typeof window === 'undefined' ? 'https://explore-with-iss.herokuapp.com/' : window.location.href;

export default () =>
	<Helmet
		title='Live position'
		titleTemplate={`${shortTitle} - %s`}
		meta={[
			{ name: 'description', content: fullDescription },
			{ property: 'og:type', content: 'singlepage-webapp' },
			{ name: 'msapplication-TileColor', content: '#da532c' },
			{ name: 'msapplication-TileImage', content: `/mstile-144x144.png?v=${faviconVersion}` },
			{ name: 'theme-color', content: '#2e2e2e' },

			{ itemprop: 'name', content: fullTitle },
			{ itemprop: 'description', content: fullDescription },
			{ itemprop: 'image', content: `${contentUrl}/social-thumnail.jpg` },

			{ name: 'twitter:card', content: `${contentUrl}/social-thumnail.jpg` },
			{ name: 'twitter:site', content: 'article' },
			{ name: 'twitter:title', content: contentUrl },
			{ name: 'twitter:description', content: fullDescription },
			{ name: 'twitter:creator', content: '@soyvogelino' },

			{ property: 'og:title', content: fullTitle },
			{ property: 'og:type', content: 'article' },
			{ property: 'og:url', content: contentUrl },
			{ property: 'og:image', content: `${contentUrl}/social-thumnail.jpg` },
			{ property: 'og:description', content: fullDescription },
			{ property: 'og:site_name', content: shortTitle },
			{ property: 'fb:admins', content: '186064998091648' }
		]}
		link={[
			{ rel: 'apple-touch-icon', sizes: '57x57', href: `/apple-touch-icon-57x57.png?v=${faviconVersion}` },
			{ rel: 'apple-touch-icon', sizes: '60x60', href: `/apple-touch-icon-60x60.png?v=${faviconVersion}` },
			{ rel: 'apple-touch-icon', sizes: '72x72', href: `/apple-touch-icon-72x72.png?v=${faviconVersion}` },
			{ rel: 'apple-touch-icon', sizes: '76x76', href: `/apple-touch-icon-76x76.png?v=${faviconVersion}` },
			{ rel: 'apple-touch-icon', sizes: '114x114', href: `/apple-touch-icon-114x114.png?v=${faviconVersion}` },
			{ rel: 'apple-touch-icon', sizes: '120x120', href: `/apple-touch-icon-120x120.png?v=${faviconVersion}` },
			{ rel: 'apple-touch-icon', sizes: '144x144', href: `/apple-touch-icon-144x144.png?v=${faviconVersion}` },
			{ rel: 'apple-touch-icon', sizes: '152x152', href: `/apple-touch-icon-152x152.png?v=${faviconVersion}` },
			{ rel: 'apple-touch-icon', sizes: '180x180', href: `/apple-touch-icon-180x180.png?v=${faviconVersion}` },
			{ rel: 'icon', type: 'image/png', href: `/favicon-32x32.png?v=${faviconVersion}`, sizes: '32x32' },
			{ rel: 'icon', type: 'image/png', href: `/favicon-194x194.png?v=${faviconVersion}`, sizes: '194x194' },
			{ rel: 'icon', type: 'image/png', href: `/favicon-96x96.png?v=${faviconVersion}`, sizes: '96x96' },
			{ rel: 'icon', type: 'image/png', href: `/android-chrome-192x192.png?v=${faviconVersion}`,
				sizes: '192x192' },
			{ rel: 'icon', type: 'image/png', href: `/favicon-16x16.png?v=${faviconVersion}`, sizes: '16x16' },
			{ rel: 'manifest', href: `/manifest.json?v=${faviconVersion}` },
			{ rel: 'mask-icon', href: `/safari-pinned-tab.svg?v=${faviconVersion}`, color: '#5bbad5' },
			{ rel: 'shortcut icon', href: `/favicon.ico?v=${faviconVersion}` }
		]}
	/>;
