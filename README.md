# Shopify widget with third-party data API provider

This is a Shopify widget that fetches data from a third-party API provider and displays it on the Shopify store.

## Features

- Fetch data from a third-party API provider
- Display data on the Shopify store
- Customizable widget
- State storage in browser Local storage

## API Provider features

- Data is synchronized with current Shopify store database through Shopify API WEBHOOKS, so the data is always up-to-date


## Installation

Widget html code is in the `widget.html` file.
Example of widget.liquid file is in the `template/widget.liquid` file.

Before  production install you need to change the `fmtEndPoint` in the `client.js` file to the correct API URL.

## Local development

To run the widget locally, you need to have a local API simulate server `srv.js` running in folder `proxy-server`.

