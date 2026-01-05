import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../hooks/useAuthQueries';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const loginMutation = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    loginMutation.mutate(
      { email, password },
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-300'>Email</label>
        <Input
          type='email'
          name='email'
          value={email}
          onChange={handleInputChange}
          placeholder='admin@example.com'
          required
        />
      </div>
      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-300'>Password</label>
        <Input
          type='password'
          name='password'
          value={password}
          onChange={handleInputChange}
          placeholder='••••••••'
          required
        />
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
