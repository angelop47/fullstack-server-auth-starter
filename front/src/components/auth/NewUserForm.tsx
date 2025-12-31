import React, { useState } from 'react';
import type { NewUserPayload } from '../../types/types';
import { authService } from '../../services/auth.service';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const NewUser: React.FC = () => {
  // const { user } = useAuth(); 
  // No necesitamos user explícitamente aquí si no hay lógica condicional de UI basada en roles en este componente
  const [formData, setFormData] = useState<NewUserPayload>({
    email: '',
    password: '',
    full_name: '',
  });

  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    msg: string;
  }>({
    type: null,
    msg: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, msg: '' });

    try {
      await authService.createNewUser(formData);

      setStatus({ type: 'success', msg: '¡Usuario creado exitosamente!' });
      setFormData({ email: '', password: '', full_name: '' });
    } catch (err) {
      const error = err as Error;
      setStatus({ type: 'error', msg: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-300'>Nombre Completo</label>
        <Input
          name='full_name'
          type='text'
          value={formData.full_name}
          onChange={handleChange}
          required
          placeholder='Juan Pérez'
        />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-300'>Email</label>
        <Input
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          required
          placeholder='juan@example.com'
        />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-300'>Contraseña</label>
        <Input
          name='password'
          type='password'
          value={formData.password}
          onChange={handleChange}
          required
          placeholder='••••••••'
        />
      </div>

      {status.msg && (
        <div
          className={`p-3 rounded-md text-sm ${status.type === 'error'
            ? 'bg-red-900/20 text-red-200 border border-red-900'
            : 'bg-green-900/20 text-green-200 border border-green-900'
            }`}
        >
          {status.msg}
        </div>
      )}

      <Button type='submit' className='w-full' disabled={loading}>
        {loading ? 'Procesando...' : 'Crear Usuario'}
      </Button>
    </form>
  );
};

export default NewUser;
