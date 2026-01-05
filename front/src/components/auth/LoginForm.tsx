import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '../../hooks/useAuthQueries';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { loginSchema, type LoginFormData } from '../../schemas/auth.schema';

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormData) => {
    setError(null);

    loginMutation.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          navigate('/dashboard');
        },
        onError: (err) => {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Ocurrió un error inesperado');
          }
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-300'>Email</label>
        <Input
          type='email'
          placeholder='admin@example.com'
          {...register('email')}
        />
        {errors.email && (
          <p className='text-xs text-red-400'>{errors.email.message}</p>
        )}
      </div>
      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-300'>Password</label>
        <Input
          type='password'
          placeholder='••••••••'
          {...register('password')}
        />
        {errors.password && (
          <p className='text-xs text-red-400'>{errors.password.message}</p>
        )}
      </div>

      {error && <p className='text-sm text-red-400'>{error}</p>}
      {loginMutation.isError && !error && (
        <p className='text-sm text-red-400'>
          {(loginMutation.error as Error)?.message || 'Error al iniciar sesión'}
        </p>
      )}

      <Button type='submit' className='w-full' disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Validando...' : 'Iniciar Sesión'}
      </Button>
    </form>
  );
};

export default LoginForm;
