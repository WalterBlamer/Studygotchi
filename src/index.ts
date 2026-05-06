import { createApp } from './app.js';
import './config.js';
import { AppDataSource } from './dataSource.js';

await AppDataSource.initialize();

const app = createApp();

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});
