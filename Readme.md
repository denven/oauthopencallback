
### [Intro](https://openoauth2callback.eastus.cloudapp.azure.com/)
Open Auth2 Callback is a simple website, exculsively providing:
  - a callback URL (aka. redirect uri) for API using **OAuth2 Authorization Code Grant flow**
  - a easy way **to get the granted code** to your clipboard by a simple click
  
![image](https://user-images.githubusercontent.com/16745984/204079362-c46288cb-5ba8-40e2-b1eb-e62e71bd713b.png)


### Tested OAuth2 API vendors
- Microsoft Graph API
- Google Cloud API



### How to use the code


Way 1. Clone the repo and run it on your local machine
  - install and run the web application
    - `npm install -D express ejs serve-favicon`      
    - `node server.js`
  - copy the localhost callback url to your target application as the callback or redirect URI/URL. e.g.: 
    - `http://localhost:8080/callback`
    - `http://127.0.0.1:8080/callback`


Way 2. Use the callback URL from a deployed site, copy it to your target application settings: 
  - [https://opencallback.eastus.cloudapp.azure.com/callback](https://openocallback.eastus.cloudapp.azure.com/callback)
    - API vendors ususally require a https URL as the redirec URL or callback URL
    - This site uses a free **self-signed certificate**, it is okay to accept the link and go forward for applicatoin dev and test
    - ![image](https://github.com/denven/oauthopencallback/assets/16745984/d2dfeb66-2b61-4232-9880-8f0464a6c052)
    - **DO NOT** use it for production application
  - or use the code to deploy one site by your own
