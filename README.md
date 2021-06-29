# Socket.IO with Express and React Example

This repository shows you how to integrate Express.js, React, and Socket.IO to create a secure chat application. Please read [Create a Secure Chat Application with Socket.IO and React][blog] to see how it was created.

**Prerequisites:**

- [Node 14](https://nodejs.org/)
- [Okta CLI](https://github.com/okta/okta-cli)

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To run this example, run the following commands:

```bash
git clone https://github.com/oktadev/okta-socket-io-chat-example.git
cd okta-socket-io-chat-example
```

### Create an OIDC Application in Okta

Create a free developer account with the following command using the [Okta CLI](https://github.com/okta/okta-cli):

```shell
okta register
```

If you already have a developer account, use `okta login` to integrate it with the Okta CLI. 

Provide the required information. Once you register, create a client application in Okta with the following command:

```shell
okta apps create
```

You will be prompted to select the following options:
- Type of Application: **2: SPA**
- Redirect URI: `http://localhost:8080/login/callback`
- Logout Redirect URI: `http://localhost:8080`

The application configuration will be printed to your screen:

```shell
Okta application configuration:
Issuer:    https://dev-133320.okta.com/oauth2/default
Client ID: 0oa5qedkihI7QcSoi357
```

You will also need to generate a token so that your chat server can communicate with the Okta authentication service. Run `okta login`, open the resulting URL in your browser, sign-in, and navigate to **Security > API**.

Select the **Tokens** tab. Click on **Create Token** and type in a name for the token. In the following popup, you will be shown the token that has been generated. 

Replace the values in `chat-server/chat.js` with these values.

```js
const jwtVerifier = new OktaJwtVerifier({
  clientId: '{yourClientID}',
  issuer: 'https://{yourOktaDomain}/oauth2/default',
});

const oktaClient = new okta.Client({
  orgUrl: 'https://{yourOktaDomain}',
  token: '{yourOktaAPIToken}',
});
```

Update `chat-client/.env` with your Okta settings too.

```dotenv
PORT=8080
REACT_APP_OKTA_ORG_URL=https://{yourOktaDomain}
REACT_APP_OKTA_CLIENT_ID={yourClientID}
```

If you haven't done so already, install the dependencies.

```shell
cd chat-server
npm install

cd chat-client
npm install
```

Start the chat server in one terminal window with `npm start`, and the chat client in another window.

```shell
npm start
```

Open `http://localhost:8080` in your favorite browser and you should be able to log in.

## Links

This example uses the following open source libraries from Okta:

* [Okta React SDK](https://github.com/okta/okta-react)
* [Okta JWT Verifier for Node.js](https://github.com/okta/okta-oidc-js/tree/master/packages/jwt-verifier)
* [Okta CLI](https://github.com/okta/okta-cli)

## Help

Please post any questions as comments on the [blog post][blog], or visit our [Okta Developer Forums](https://devforum.okta.com/).

## License

Apache 2.0, see [LICENSE](LICENSE).

[blog]: https://developer.okta.com/blog/2021/07/19/socket-io-react
