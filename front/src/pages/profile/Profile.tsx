import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className='flex min-h-[80vh] items-center justify-center p-4 bg-gray-950'>
      <Card className='w-full max-w-md border-gray-800 bg-gray-900/50 backdrop-blur-sm'>
        <CardHeader className='text-center'>
          <div className='mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/20 text-3xl font-bold text-indigo-400 border border-indigo-500/30'>
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <CardTitle className='text-2xl text-white'>Perfil de Usuario</CardTitle>
          <CardDescription className='text-gray-400'>Información de tu cuenta</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='rounded-lg bg-gray-950/50 p-4 border border-white/5'>
            <p className='text-sm font-medium text-gray-500 mb-1'>Email</p>
            <p className='text-gray-200'>{user?.email}</p>
          </div>

          {/* <div className="grid grid-cols-2 gap-4"> */}
          <div className='rounded-lg bg-gray-950/50 p-4 border border-white/5'>
            <p className='text-sm font-medium text-gray-500 mb-1'>ID</p>
            <p className='text-gray-200 truncate' title={user?.id}>
              {user?.id?.substring(0, 40)}...
            </p>
          </div>
          <div className='rounded-lg bg-gray-950/50 p-4 border border-white/5'>
            <p className='text-sm font-medium text-gray-500 mb-1'>Rol</p>
            <span className='inline-flex items-center rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/20 capitalize'>
              {user?.role}
            </span>
          </div>
          <button
            onClick={logout}
            className='rounded-lg p-2.5 cursor-pointer bg-red-500 text-white border-none'
          >
            Cerrar Sesión
          </button>
          {/* </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
