import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from './Button';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleReload = () => {
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className='flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4 text-white'>
                    <div className='max-w-md text-center space-y-4'>
                        <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-900/30'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='h-10 w-10 text-red-500'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                                />
                            </svg>
                        </div>
                        <h1 className='text-2xl font-bold'>¡Algo salió mal!</h1>
                        <p className='text-gray-400'>
                            Ha ocurrido un error inesperado en la aplicación. Hemos registrado el problema.
                        </p>
                        {this.state.error && (
                            <div className='rounded bg-gray-950 p-3 text-left text-xs font-mono text-red-300 overflow-auto max-h-32 border border-red-900/30'>
                                {this.state.error.message}
                            </div>
                        )}
                        <div className='pt-4'>
                            <Button onClick={this.handleReload} className='w-full'>
                                Recargar Página
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
