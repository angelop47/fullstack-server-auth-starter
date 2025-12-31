import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';

const app = express();

// Configuración de seguridad HTTP
app.use(helmet());

// Configuración de CORS para permitir credenciales (cookies)
app.use(cors(
    {
        origin: env.corsOrigin,
        credentials: true,
    }
));

// Parsers para el body y cookies
app.use(express.json());
app.use(cookieParser());

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;
