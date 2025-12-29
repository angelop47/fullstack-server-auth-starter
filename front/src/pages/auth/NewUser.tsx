import NewUserForm from '../../components/auth/NewUserForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';

export default function NewUser() {
  return (
    <div className='flex min-h-[80vh] items-center justify-center p-4'>
      <Card className='w-full max-w-md border-gray-800 bg-gray-950/50 backdrop-blur-sm'>
        <CardHeader>
          <CardTitle className='text-2xl text-center text-white'>Registrar Nuevo Usuario</CardTitle>
          <CardDescription className='text-center text-gray-400'>
            Esta acción requiere permisos de administrador.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NewUserForm />
        </CardContent>
      </Card>
    </div>
  );
}
