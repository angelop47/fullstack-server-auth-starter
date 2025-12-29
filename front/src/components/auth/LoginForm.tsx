import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await authService.login(email, password);

      // Update auth context
      login(data.user, data.access_token);

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error inesperado');
      }
    } finally {
      setLoading(false);
    }
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

      <Button type='submit' className='w-full' disabled={loading}>
        {loading ? 'Validando...' : 'Iniciar Sesión'}
      </Button>
    </form>
  );
};

export default LoginForm;
