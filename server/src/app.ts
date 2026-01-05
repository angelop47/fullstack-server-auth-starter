import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import { authLimiter } from './middlewares/rate-limit.middleware';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

// Configuración de confianza en proxy (necesario para rate limiting correcto detrás de balanceadores)
app.set('trust proxy', env.trustProxy);

// Configuración de seguridad HTTP
app.use(helmet());

// Configuración de CORS
app.use(cors({
    origin: env.corsOrigin,
    credentials: true,
}));

// Parsers para el body y cookies
app.use(express.json());
app.use(cookieParser());

// Rutas de la API con Rate Limiting
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Middleware de manejo de errores (siempre al final)
app.use(errorMiddleware);

export default app;
