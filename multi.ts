import { cpus } from 'os';
import cluster from 'cluster';

import { server } from './index';

const numOfCpus = cpus().length;
const PORT = process.env.PORT || 8000;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numOfCpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  server.listen(PORT, () => {
    console.log(`SERVER IS LISTENING ON PORT ${PORT}`);
  });
  console.log(`Worker ${process.pid} started`);
}
