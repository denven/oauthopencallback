> Open Auth2 Callback is a simple website, exculsively providing:
> - the callback (aka. redirect uri) URL for API using OAuth2 Authorization Code Grant flow;
> - as well as a easy way to get the granted code to clipboard by a simple click.

### Supported OAuth2 vendors
- Microsoft Graph API



### How to use

1. Use the callback URL from a deployed site:
- [https://openoauth2callback.eastus.cloudapp.azure.com/callback](https://openoauth2callback.eastus.cloudapp.azure.com/callback).
        - API vendors ususally require a https URL as the redirec URL or callback URL
        - This site uses a free self-signed certificate, it is okay to use for applicatoin dev and test
        - DO NOT use it for application production


2. Clone the repo and run it on your local machine:
- install and run the web application

        ```bash
        npm install -D express ejs serve-favicon
        node server.js
        ```
- copy the localhost callback url to your target application. e.g.: `http://localhost:8080/callback`