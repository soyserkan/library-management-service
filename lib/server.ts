import dotenv from 'dotenv';
dotenv.config();

import { App } from './app';
import { dbInit } from './models/init/db';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

(async function init() {
  const app = new App();
  app.server.listen(PORT, () => console.log('listening on port ' + PORT));
  await dbInit();
})();