# Webpack Template

## Features:
- #### DEVELOPMENT:
	- Automatic creation of HTML pages.
	- Automatic creation of entry points.
	- Supports PUG, SCSS.
	- HMR working with SCSS, JS, PUG files.
	- Connect from any device in dev mode, firewall provided.
		- Use 'ip addr show' to find out the ip.
		- <your-ip>:<port = 8081>/pages/<page>.html

- #### PRODUCTION:
	- Extracts CSS files into different chunks.
	- Separates JS files for each page with vendors file containing all shared code.
	- CSS autoprefixed, media queries joined, minified, comments removed.
	- Images optimization.

## Usage:
	- Structure:
		- js files for pages are in 'src' page;
		- pug templates for pages are in 'src/pug/pages';
		- scss files for pages are in 'assets'
