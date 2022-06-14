import { createServer } from 'http';

import 'dotenv/config';

const server = createServer();

server.on('request', (req, res) => {
  if (req.url && req.url.includes('/api/users')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        data: 'Hello World!',
      })
    );
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Request to non-existing address',
      })
    );
  }
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`SERVER IS LISTENING ON PORT ${PORT}`);
});
