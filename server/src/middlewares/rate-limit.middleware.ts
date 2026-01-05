import rateLimit from 'express-rate-limit';

/**
 * Limiter estricto para rutas de autenticación (login/signup).
 * Previene ataques de fuerza bruta permitiendo pocas peticiones en un intervalo de tiempo.
 */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 30,
    message: {
        message: 'Too many attempts, please try again later',
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true, // Solo cuenta intentos fallidos
});

/**
 * Limiter general para la API.
 * Protege el servidor de sobrecarga con un límite más permisivo.
 */
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});