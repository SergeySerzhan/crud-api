import { createServer, IncomingMessage, ServerResponse } from 'http';

import 'dotenv/config';

import { sendRes } from './helpers/sendRes';
import { getHandler } from './handlers/getHandler';
import { postHandler } from './handlers/postHandler';
import { putHandler } from './handlers/putHandler';
import { deleteHandler } from './handlers/deleteHandler';

const server = createServer();

server.on('request', async (req: IncomingMessage, res: ServerResponse) => {
  const buffers = [];
  let body: any;

  // Receive req.body
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const data = Buffer.concat(buffers).toString();
  if (data) {
    body = JSON.parse(data);
  }

  if (req.url && req.url.includes('/api/users')) {
    switch (req.method) {
      case 'GET':
        getHandler(req.url, res);
        break;
      case 'POST':
        postHandler(body, res);
        break;
      case 'PUT':
        putHandler(req.url, body, res);
        break;
      case 'DELETE':
        deleteHandler(req.url, res);
        break;
    }
  } else {
    sendRes(res, 404, { message: 'Request to non-existing address' });
  }
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`SERVER IS LISTENING ON PORT ${PORT}`);
});
