import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { Truck, Pencil, Trash2, Plus, X } from 'lucide-react';
import api from '../services/api';

const Suppliers = () => {
    const { isAdmin } = useAuth();
    const [suppliers, setSuppliers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: '', contactEmail: '', phone: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        const response = await api.get('/api/suppliers');
        setSuppliers(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.name) {
            setError('El nombre es requerido');
            return;
        }
        try {
            if (editing) {
                await api.put(`/api/suppliers/${editing.id}`, form);
            } else {
                await api.post('/api/suppliers', form);
            }
            setForm({ name: '', contactEmail: '', phone: '' });
            setShowForm(false);
            setEditing(null);
            fetchSuppliers();
        } catch {
            setError('Error al guardar el proveedor');
        }
    };

    const handleEdit = (supplier) => {
        setEditing(supplier);
        setForm({ name: supplier.name, contactEmail: supplier.contactEmail, phone: supplier.phone });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (confirm('¿Estás seguro de eliminar este proveedor?')) {
            await api.delete(`/api/suppliers/${id}`);
            fetchSuppliers();
        }
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.header}>
                    <div style={styles.titleRow}>
                        <Truck size={24} color="#1e293b" />
                        <h2 style={styles.title}>Proveedores</h2>
                    </div>
                    {isAdmin() && (
                        <button style={styles.addBtn} onClick={() => { setShowForm(!showForm); setEditing(null); setForm({ name: '', contactEmail: '', phone: '' }); }}>
                            <Plus size={16} /> Nuevo Proveedor
                        </button>
                    )}
                </div>

                {showForm && isAdmin() && (
                    <div style={styles.form}>
                        <div style={styles.formHeader}>
                            <h3 style={styles.formTitle}>{editing ? 'Editar Proveedor' : 'Nuevo Proveedor'}</h3>
                            <button style={styles.closeBtn} onClick={() => { setShowForm(false); setEditing(null); }}>
                                <X size={18} />
                            </button>
                        </div>
                        {error && <div style={styles.error}>{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div style={styles.grid2}>
                                <div style={styles.field}>
                                    <label style={styles.label}>Nombre *</label>
                                    <input style={styles.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nombre del proveedor" />
                                </div>
                                <div style={styles.field}>
                                    <label style={styles.label}>Email de contacto</label>
                                    <input style={styles.input} type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} placeholder="email@ejemplo.com" />
                                </div>
                                <div style={styles.field}>
                                    <label style={styles.label}>Teléfono</label>
                                    <input style={styles.input} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+56 9 1234 5678" />
                                </div>
                            </div>
                            <div style={styles.formButtons}>
                                <button type="submit" style={styles.saveBtn}>{editing ? 'Actualizar' : 'Guardar'}</button>
                                <button type="button" style={styles.cancelBtn} onClick={() => { setShowForm(false); setEditing(null); }}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                )}

                <table style={styles.table}>
                    <thead>
                        <tr style={styles.thead}>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Nombre</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Teléfono</th>
                            {isAdmin() && <th style={styles.th}>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map((s) => (
                            <tr key={s.id} style={styles.tr}>
                                <td style={styles.td}>{s.id}</td>
                                <td style={styles.td}>{s.name}</td>
                                <td style={styles.td}>{s.contactEmail}</td>
                                <td style={styles.td}>{s.phone}</td>
                                {isAdmin() && (
                                    <td style={styles.td}>
                                        <button style={styles.editBtn} onClick={() => handleEdit(s)}>
                                            <Pencil size={14} /> Editar
                                        </button>
                                        <button style={styles.deleteBtn} onClick={() => handleDelete(s.id)}>
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
    editBtn: { backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', marginRight: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' },
    deleteBtn: { backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' },
};

export default Suppliers;