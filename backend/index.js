import cluster from 'cluster';
import os from 'os';

import { expressServer } from './app.js';
import { ENV_VARS } from './config/env.config.js';
import { connectDB } from './config/db.config.js';

/**
 * Determines the number of available CPU cores on the system, or defaults to 3 if the number of CPUs cannot be determined.
 */
const totalCPUs = os.cpus().length;

if (!totalCPUs) {
  totalCPUs = 3;
}

/**
 * Creates a cluster of worker processes based on the number of available CPUs.
 */
if (cluster.isPrimary) {
  console.log(`Primary Server ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  /**
   * Handles the event when a worker process dies. When a worker process dies.
   */
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // Initialize and Configures the Express server.
  const app = expressServer();

  // Starts the server and connects to the MongoDB database.
  const { PORT, CLIENT_URL } = ENV_VARS;
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} is up and running on port: ${PORT}`);
    console.log(`➜  Server:   http://localhost:${PORT}`);
    console.log(`➜  Website:   ${CLIENT_URL}`);
    connectDB();
  });
}
