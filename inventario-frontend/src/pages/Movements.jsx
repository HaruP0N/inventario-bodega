import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { BarChart2, Trash2, Plus, X, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import api from '../services/api';

const Movements = () => {
    const { isAdmin } = useAuth();
    const [movements, setMovements] = useState([]);
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ type: 'ENTRADA', quantity: '', reason: '', productId: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        const [m, p] = await Promise.all([
            api.get('/api/movements'),
            api.get('/api/products'),
        ]);
        setMovements(m.data);
        setProducts(p.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.quantity || !form.productId) {
            setError('Cantidad y producto son requeridos');
            return;
        }
        try {
            const payload = {
                ...form,
                quantity: parseInt(form.quantity),
                productId: parseInt(form.productId),
            };
            await api.post('/api/movements', payload);
            setForm({ type: 'ENTRADA', quantity: '', reason: '', productId: '' });
            setShowForm(false);
            fetchAll();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrar el movimiento');
        }
    };

    const handleDelete = async (id) => {
        if (confirm('¿Estás seguro de eliminar este movimiento?')) {
            await api.delete(`/api/movements/${id}`);
            fetchAll();
        }
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.header}>
                    <div style={styles.titleRow}>
                        <BarChart2 size={24} color="#1e293b" />
                        <h2 style={styles.title}>Movimientos de Stock</h2>
                    </div>
                    {isAdmin() && (
                        <button style={styles.addBtn} onClick={() => { setShowForm(!showForm); setForm({ type: 'ENTRADA', quantity: '', reason: '', productId: '' }); }}>
                            <Plus size={16} /> Nuevo Movimiento
                        </button>
                    )}
                </div>

                {showForm && isAdmin() && (
                    <div style={styles.form}>
                        <div style={styles.formHeader}>
                            <h3 style={styles.formTitle}>Nuevo Movimiento</h3>
                            <button style={styles.closeBtn} onClick={() => setShowForm(false)}>
                                <X size={18} />
                            </button>
                        </div>
                        {error && <div style={styles.error}>{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div style={styles.grid2}>
                                <div style={styles.field}>
                                    <label style={styles.label}>Tipo *</label>
                                    <select style={styles.input} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                                        <option value="ENTRADA">ENTRADA</option>
                                        <option value="SALIDA">SALIDA</option>
                                    </select>
                                </div>
                                <div style={styles.field}>
                                    <label style={styles.label}>Producto *</label>
                                    <select style={styles.input} value={form.productId} onChange={(e) => setForm({ ...form, productId: e.target.value })}>
                                        <option value="">Selecciona un producto</option>
                                        {products.map(p => <option key={p.id} value={p.id}>{p.name} (Stock: {p.stock})</option>)}
                                    </select>
                                </div>
                                <div style={styles.field}>
                                    <label style={styles.label}>Cantidad *</label>
                                    <input style={styles.input} type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="0" min="1" />
                                </div>
                                <div style={styles.field}>
                                    <label style={styles.label}>Motivo</label>
                                    <input style={styles.input} value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} placeholder="Motivo del movimiento" />
                                </div>
                            </div>
                            <div style={styles.formButtons}>
                                <button type="submit" style={styles.saveBtn}>Registrar</button>
                                <button type="button" style={styles.cancelBtn} onClick={() => setShowForm(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                )}

                <table style={styles.table}>
                    <thead>
                        <tr style={styles.thead}>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Tipo</th>
                            <th style={styles.th}>Producto</th>
                            <th style={styles.th}>Cantidad</th>
                            <th style={styles.th}>Motivo</th>
                            <th style={styles.th}>Fecha</th>
                            {isAdmin() && <th style={styles.th}>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {movements.map((m) => (
                            <tr key={m.id} style={styles.tr}>
                                <td style={styles.td}>{m.id}</td>
                                <td style={styles.td}>
                                    <span style={m.type === 'ENTRADA' ? styles.badgeEntrada : styles.badgeSalida}>
                                        {m.type === 'ENTRADA'
                                            ? <ArrowDownCircle size={14} />
                                            : <ArrowUpCircle size={14} />
                                        }
                                        {m.type}
                                    </span>
                                </td>
                                <td style={styles.td}>{m.productName}</td>
                                <td style={styles.td}>{m.quantity}</td>
                                <td style={styles.td}>{m.reason}</td>
                                <td style={styles.td}>{new Date(m.date).toLocaleString()}</td>
                                {isAdmin() && (
                                    <td style={styles.td}>
                                        <button style={styles.deleteBtn} onClick={() => handleDelete(m.id)}>
                                            <Trash2 size={14} /> Eliminar
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    titleRow: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
    title: { color: '#1e293b', margin: 0 },
    addBtn: { backgroundColor: '#1e293b', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' },
    form: { backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', marginBottom: '1.5rem' },
    formHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
    formTitle: { margin: 0, color: '#1e293b' },
    closeBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' },
    grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' },
    field: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
    label: { fontSize: '0.9rem', color: '#374151', fontWeight: '500' },
    input: { padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.95rem' },
    formButtons: { display: 'flex', gap: '0.8rem' },
    saveBtn: { backgroundColor: '#1e293b', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer' },
    cancelBtn: { backgroundColor: '#e2e8f0', color: '#1e293b', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer' },
    error: { backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' },
    table: { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
    thead: { backgroundColor: '#1e293b', color: 'white' },
    th: { padding: '1rem', textAlign: 'left', fontSize: '0.9rem' },
    tr: { borderBottom: '1px solid #e2e8f0' },
    td: { padding: '1rem', fontSize: '0.9rem', color: '#374151' },
    badgeEntrada: { backgroundColor: '#dcfce7', color: '#16a34a', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' },
    badgeSalida: { backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' },
    deleteBtn: { backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' },
};

export default Movements;