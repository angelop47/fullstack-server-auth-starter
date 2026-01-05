import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authService } from '../../services/auth.service';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { newUserSchema, type NewUserFormData } from '../../schemas/auth.schema';

const NewUser: React.FC = () => {
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    msg: string;
  }>({
    type: null,
    msg: '',
  });
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewUserFormData>({
    resolver: zodResolver(newUserSchema),
  });

  const onSubmit = async (data: NewUserFormData) => {
    setLoading(true);
    setStatus({ type: null, msg: '' });

    try {
      await authService.createNewUser(data);

      setStatus({ type: 'success', msg: '¡Usuario creado exitosamente!' });
      reset();
    } catch (err) {
      const error = err as Error;
      setStatus({ type: 'error', msg: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-300'>Nombre Completo</label>
        <Input
          placeholder='Juan Pérez'
          {...register('full_name')}
        />
        {errors.full_name && (
          <p className='text-xs text-red-400'>{errors.full_name.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-300'>Email</label>
        <Input
          type='email'
          placeholder='juan@example.com'
          {...register('email')}
        />
        {errors.email && (
          <p className='text-xs text-red-400'>{errors.email.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-300'>Contraseña</label>
        <Input
          type='password'
          placeholder='••••••••'
          {...register('password')}
        />
        {errors.password && (
          <p className='text-xs text-red-400'>{errors.password.message}</p>
        )}
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

