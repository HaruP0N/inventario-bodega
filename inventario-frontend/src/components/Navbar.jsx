import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, Tag, Truck, Warehouse, BarChart2, LogOut, User, ShieldCheck } from 'lucide-react';

const Navbar = () => {
    const { user, logoutUser, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.brand}>
                <Package size={22} color="#fff" />
                <Link to="/dashboard" style={styles.brandLink}>
                    Inventario Bodega
                </Link>
            </div>
            <div style={styles.links}>
                <Link to="/products" style={styles.link}>
                    <Package size={15} /> Productos
                </Link>
                <Link to="/categories" style={styles.link}>
                    <Tag size={15} /> Categorías
                </Link>
                <Link to="/suppliers" style={styles.link}>
                    <Truck size={15} /> Proveedores
                </Link>
                <Link to="/warehouses" style={styles.link}>
                    <Warehouse size={15} /> Bodegas
                </Link>
                <Link to="/movements" style={styles.link}>
                    <BarChart2 size={15} /> Movimientos
                </Link>
                {isAdmin() && (
                    <span style={styles.adminBadge}>
                        <ShieldCheck size={13} /> ADMIN
                    </span>
                )}
            </div>
            <div style={styles.userInfo}>
                <span style={styles.username}>
                    <User size={15} /> {user?.sub}
                </span>
                <button onClick={handleLogout} style={styles.logoutBtn}>
                    <LogOut size={15} /> Cerrar sesión
                </button>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 2rem',
        backgroundColor: '#1e293b',
        color: 'white',
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1.1rem',
        fontWeight: 'bold',
    },
    brandLink: {
        color: 'white',
        textDecoration: 'none',
    },
    links: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
    },
    link: {
        color: '#94a3b8',
        textDecoration: 'none',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
    },
    adminBadge: {
        backgroundColor: '#ef4444',
        color: 'white',
        padding: '0.2rem 0.6rem',
        borderRadius: '4px',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    username: {
        fontSize: '0.9rem',
        color: '#94a3b8',
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
    },
    logoutBtn: {
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        padding: '0.4rem 0.8rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
    },
};

export default Navbar;