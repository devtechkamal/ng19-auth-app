import express from 'express';
import config from './config';
import routes from './routes';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(express.json());
app.use(cors());

app.use('', routes);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
