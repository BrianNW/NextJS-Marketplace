// Next.js custom server to enable API proxying for local development
const { createServer } = require('http');
const next = require('next');
const proxy = require('./pages/api/proxy');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    proxy(req, res, () => handle(req, res));
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
