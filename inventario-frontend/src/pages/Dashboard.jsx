import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { Package, Tag, Truck, Warehouse, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();

    const cards = [
        { icon: <Package size={32} color="#1e293b" />, title: 'Productos', description: 'Gestiona el inventario de productos', path: '/products' },
        { icon: <Tag size={32} color="#1e293b" />, title: 'Categorías', description: 'Organiza productos por categoría', path: '/categories' },
        { icon: <Truck size={32} color="#1e293b" />, title: 'Proveedores', description: 'Administra tus proveedores', path: '/suppliers' },
        { icon: <Warehouse size={32} color="#1e293b" />, title: 'Bodegas', description: 'Controla las ubicaciones de almacenaje', path: '/warehouses' },
        { icon: <BarChart2 size={32} color="#1e293b" />, title: 'Movimientos', description: 'Registra entradas y salidas de stock', path: '/movements' },
    ];

    return (
        <div style={{ backgroundColor: '#0f172a', minHeight: '100vh' }}>
            <Navbar />
            <div style={styles.container}>
                <h1 style={styles.title}>Bienvenido, {user?.sub}</h1>
                <p style={styles.subtitle}>
                    Rol: <span style={styles.role}>
                        {isAdmin() ? 'Administrador' : 'Usuario'}
                    </span>
                </p>
                <div style={styles.grid}>
                    {cards.map((card) => (
                        <div
                            key={card.title}
                            style={styles.card}
                            onClick={() => navigate(card.path)}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)'}
                        >
                            <div style={styles.iconBox}>{card.icon}</div>
                            <h3 style={styles.cardTitle}>{card.title}</h3>
                            <p style={styles.cardDesc}>{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    title: {
        color: '#ffffff',
        marginBottom: '0.5rem',
        fontSize: '2rem',
    },
    subtitle: {
        color: '#94a3b8',
        marginBottom: '2rem',
    },
    role: {
        backgroundColor: '#1e293b',
        color: 'white',
        padding: '0.2rem 0.6rem',
        borderRadius: '4px',
        fontSize: '0.85rem',
        border: '1px solid #ffffff30',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1.5rem',
    },
    card: {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
    },
    iconBox: {
        marginBottom: '1rem',
    },
    cardTitle: {
        color: '#1e293b',
        marginBottom: '0.5rem',
    },
    cardDesc: {
        color: '#64748b',
        fontSize: '0.85rem',
    },
};

export default Dashboard;