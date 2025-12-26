import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import type { NewUserPayload } from '../../types/types';

const NewUser: React.FC = () => {
    const { token } = useAuth(); // Extraemos el token del administrador
    const [formData, setFormData] = useState<NewUserPayload>({
        email: '',
        password: '',
        full_name: ''
    });

    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({
        type: null,
        msg: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, msg: '' });

        try {
            const response = await fetch('http://localhost:4000/api/auth/new-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Aquí pasamos el token dinámicamente
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al crear el usuario');
            }

            setStatus({ type: 'success', msg: '¡Usuario creado exitosamente!' });
            setFormData({ email: '', password: '', full_name: '' }); // Limpiar formulario

        } catch (err) {
            const error = err as Error;
            setStatus({ type: 'error', msg: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
            <h3>Registrar Nuevo Usuario</h3>
            <p >Esta acción requiere permisos de administrador.</p>

            <form onSubmit={handleSubmit}>
                <div >
                    <label>Nombre Completo:</label>
                    <input
                        name="full_name"
                        type="text"
                        value={formData.full_name}
                        onChange={handleChange}
                        required

                    />
                </div>

                <div >
                    <label>Email:</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required

                    />
                </div>

                <div >
                    <label>Contraseña:</label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required

                    />
                </div>

                {status.msg && (
                    <div >
                        {status.msg}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading || !token}

                >
                    {loading ? 'Procesando...' : 'Crear Usuario'}
                </button>
            </form>
        </div>
    );
};

export default NewUser;