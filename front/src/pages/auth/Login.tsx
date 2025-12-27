import LoginForm from "../../components/auth/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";

export default function Login() {
    return (
        <div className="flex min-h-[80vh] items-center justify-center p-4">
            <Card className="w-full max-w-md border-gray-800 bg-gray-950/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl text-center text-white">Bienvenido</CardTitle>
                    <CardDescription className="text-center text-gray-400">
                        Ingresa tus credenciales para acceder al sistema.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    );
}