const express = require('express');
const next = require('next');
const basicAuth = require('express-basic-auth');

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  if (process.env.REQUIRE_BASIC_HTTP_AUTH) {
    server.use(basicAuth({
      challenge: true,
      users: {
        [process.env.BASIC_HTTP_AUTH_USERNAME]: process.env.BASIC_HTTP_AUTH_PASSWORD
      }
    }));
  }

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
