import { createServer, IncomingMessage, ServerResponse } from 'http';

import 'dotenv/config';

import { sendRes } from './helpers/sendRes';
import { getHandler } from './handlers/getHandler';
import { postHandler } from './handlers/postHandler';
import { putHandler } from './handlers/putHandler';
import { deleteHandler } from './handlers/deleteHandler';
import { CustomError } from './helpers/CustomError';
import { statusCodeEnum } from './enums/statusCodeEnum';
import { errMsgEnum } from './enums/errMsgEnum';

const server = createServer();

server.on('request', async (req: IncomingMessage, res: ServerResponse) => {
  try {
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

    if (req.url && req.url.startsWith('/api/users')) {
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
      sendRes(res, statusCodeEnum.notFound, { message: errMsgEnum.validAddr });
    }
  } catch (e) {
    if (e instanceof CustomError)
      sendRes(res, e.statusCode, { message: e.message });
    else console.log(e);
  }

  process.on('unhandledRejection', () => {
    sendRes(res, statusCodeEnum.serverErr, { message: errMsgEnum.serverErr });
    process.exit();
  });

  process.on('uncaughtException', () => {
    sendRes(res, statusCodeEnum.serverErr, { message: errMsgEnum.serverErr });
    process.exit();
  });
});

process.on('SIGINT', () => {
  server.close();
  process.exit();
});

export { server };
