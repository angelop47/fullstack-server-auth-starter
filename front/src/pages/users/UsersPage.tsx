
import { useEffect, useState } from 'react';
import type { User } from '../../types/types';
import { userService } from '../../services/user.service';

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await userService.getUsers();
            setUsers(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar usuarios');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-white">Cargando usuarios...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className='min-h-screen bg-gray-900 text-white p-8'>
            <div className='max-w-6xl mx-auto'>
                <h1 className='text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                    Gestión de Usuarios
                </h1>

                <div className='bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700'>
                    <div className='overflow-x-auto'>
                        <table className='w-full text-left'>
                            <thead>
                                <tr className='bg-gray-700/50'>
                                    <th className='p-4 font-semibold text-gray-300'>Avatar</th>
                                    <th className='p-4 font-semibold text-gray-300'>Nombre</th>
                                    <th className='p-4 font-semibold text-gray-300'>Email</th>
                                    <th className='p-4 font-semibold text-gray-300'>Rol</th>
                                    <th className='p-4 font-semibold text-gray-300'>ID</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-700'>
                                {users.map((user) => (
                                    <tr key={user.id} className='hover:bg-gray-700/30 transition-colors'>
                                        <td className='p-4'>
                                            {user.avatar_url ? (
                                                <img
                                                    src={user.avatar_url}
                                                    alt={user.full_name}
                                                    className='w-10 h-10 rounded-full object-cover border-2 border-purple-500/30'
                                                />
                                            ) : (
                                                <div className='w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center border-2 border-gray-500'>
                                                    <span className='text-sm font-bold text-gray-300'>
                                                        {user.email.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                            )}
                                        </td>
                                        <td className='p-4 font-medium'>
                                            {user.full_name || <span className='text-gray-500 italic'>Sin nombre</span>}
                                        </td>
                                        <td className='p-4 text-gray-300'>{user.email}</td>
                                        <td className='p-4'>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'admin'
                                                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                                    : 'bg-green-500/20 text-green-300 border border-green-500/30'
                                                    }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className='p-4 text-gray-500 text-xs font-mono truncate max-w-[100px]'>
                                            {user.id}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
