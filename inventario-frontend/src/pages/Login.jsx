import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { Package, LogIn } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { loginUser, user } = useAuth();
    const navigate = useNavigate();

    if (user) {
        navigate('/dashboard');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await login(username, password);
            loginUser(data.token);
            navigate('/dashboard');
        } catch {
            setError('Credenciales incorrectas. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.iconContainer}>
                    <Package size={40} color="#1e293b" />
                </div>
                <h2 style={styles.title}>Inventario Bodega</h2>
                <p style={styles.subtitle}>Inicia sesión para continuar</p>
                {error && (
                    <div style={styles.error}>
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.field}>
                        <label style={styles.label}>Usuario</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                            placeholder="Ingresa tu usuario"
                            required
                        />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        style={styles.button}
                        disabled={loading}
                    >
                        <LogIn size={18} />
                        {loading ? 'Cargando...' : 'Iniciar sesión'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
    },
    card: {
        backgroundColor: 'white',
        padding: '2.5rem',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        width: '100%',
        maxWidth: '400px',
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '1rem',
    },
    title: {
        textAlign: 'center',
        color: '#1e293b',
        marginBottom: '0.5rem',
        fontSize: '1.5rem',
    },
    subtitle: {
        textAlign: 'center',
        color: '#64748b',
        marginBottom: '1.5rem',
        fontSize: '0.9rem',
    },
    error: {
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        padding: '0.75rem',
        borderRadius: '8px',
        marginBottom: '1rem',
        fontSize: '0.9rem',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
    },
    label: {
        fontSize: '0.9rem',
        color: '#374151',
        fontWeight: '500',
    },
    input: {
        padding: '0.6rem 0.8rem',
        borderRadius: '8px',
        border: '1px solid #d1d5db',
        fontSize: '0.95rem',
        outline: 'none',
    },
    button: {
        backgroundColor: '#1e293b',
        color: 'white',
        border: 'none',
        padding: '0.75rem',
        borderRadius: '8px',
        fontSize: '1rem',
        cursor: 'pointer',
        marginTop: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
    },
};

export default Login;