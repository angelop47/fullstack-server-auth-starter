import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard Privado</h1>
      <div style={{ padding: '15px', borderRadius: '8px' }}>
        <p>
          <strong>ID:</strong> {user?.id}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Rol:</strong> <span style={{ color: 'blue' }}>{user?.role}</span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
