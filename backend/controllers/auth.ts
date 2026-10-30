import express, { Request, Response } from 'express';
import { registration, login } from '../services/auth/auth';

const authRouter = express();

authRouter.use(express.json());

authRouter.post('/register', async (req: Request, res: Response) => {
    let formdata = {
        email: req.body.email,
        password: req.body.password
    }

    let response = await registration(formdata)
    res.json(response)
});

authRouter.post('/login', async (req: Request, res: Response) => {
    let formdata = {
        email: req.body.email,
        password: req.body.password
    }

    let response = await login(formdata)
    res.json(response)
});

export default authRouter;