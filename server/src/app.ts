import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';

const app = express();

app.use(helmet());

app.use(cors(
    {
        origin: env.corsOrigin,
        credentials: true,
    }
));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;
