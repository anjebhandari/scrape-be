import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());

app.set('port', (process.env as any).PORT || 3000);
app.set('host', (process.env as any).HOST || '0.0.0.0' || 'localhost');

export default app;