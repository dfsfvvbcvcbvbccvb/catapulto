import express, { Request, Response } from 'express';
import authRouter from './controllers/auth';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use('/api', authRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
