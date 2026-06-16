import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { Package, Pencil, Trash2, Plus, X } from 'lucide-react';
import api from '../services/api';

const Products = () => {
    const { isAdmin } = useAuth();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        name: '', description: '', price: '', stock: '',
        categoryId: '', supplierId: '', warehouseId: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        const [p, c, s, w] = await Promise.all([
            api.get('/api/products'),
            api.get('/api/categories'),
            api.get('/api/suppliers'),
            api.get('/api/warehouses'),
        ]);
        setProducts(p.data);
        setCategories(c.data);
        setSuppliers(s.data);
        setWarehouses(w.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.name || !form.price || !form.stock || !form.categoryId || !form.supplierId || !form.warehouseId) {
            setError('Todos los campos son requeridos');
            return;
        }
        try {
            const payload = {
                ...form,
                price: parseFloat(form.price),
                stock: parseInt(form.stock),
                categoryId: parseInt(form.categoryId),
                supplierId: parseInt(form.supplierId),
                warehouseId: parseInt(form.warehouseId),
            };
            if (editing) {
                await api.put(`/api/products/${editing.id}`, payload);
            } else {
                await api.post('/api/products', payload);
            }
            setForm({ name: '', description: '', price: '', stock: '', categoryId: '', supplierId: '', warehouseId: '' });
            setShowForm(false);
            setEditing(null);
            fetchAll();
        } catch {
            setError('Error al guardar el producto');
        }
    };

    const handleEdit = (product) => {
        setEditing(product);
        setForm({
            name: product.name,
            description: product.description || '',
            price: product.price,
            stock: product.stock,
            categoryId: categories.find(c => c.name === product.categoryName)?.id || '',
            supplierId: suppliers.find(s => s.name === product.supplierName)?.id || '',
            warehouseId: warehouses.find(w => w.name === product.warehouseName)?.id || '',
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            await api.delete(`/api/products/${id}`);
            fetchAll();
        }
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.header}>
                    <div style={styles.titleRow}>
                        <Package size={24} color="#1e293b" />
                        <h2 style={styles.title}>Productos</h2>
                    </div>
                    {isAdmin() && (
                        <button style={styles.addBtn} onClick={() => { setShowForm(!showForm); setEditing(null); setForm({ name: '', description: '', price: '', stock: '', categoryId: '', supplierId: '', warehouseId: '' }); }}>
                            <Plus size={16} /> Nuevo Producto
                        </button>
                    )}
                </div>

                {showForm && isAdmin() && (
                    <div style={styles.form}>
                        <div style={styles.formHeader}>
                            <h3 style={styles.formTitle}>{editing ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                            <button style={styles.closeBtn} onClick={() => { setShowForm(false); setEditing(null); }}>
                                <X size={18} />
                            </button>
                        </div>
                        {error && <div style={styles.error}>{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div style={styles.grid2}>
                                <div style={styles.field}>
                                    <label style={styles.label}>Nombre *</label>
                                    <input style={styles.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nombre del producto" />
                                </div>
                                <div style={styles.field}>
                                    <label style={styles.label}>Descripción</label>
                                    <input style={styles.input} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Descripción opcional" />
                                </div>
                                <div style={styles.field}>
                                    <label style={styles.label}>Precio *</label>
                                    <input style={styles.input} type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00" />
                                </div>
                                <div style={styles.field}>
                                    <label style={styles.label}>Stock *</label>
                                    <input style={styles.input} type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="0" />
                                </div>
                                <div style={styles.field}>
                                    <label style={styles.label}>Categoría *</label>
                                    <select style={styles.input} value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                                        <option value="">Selecciona una categoría</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div style={styles.field}>
                                    <label style={styles.label}>Proveedor *</label>
                                    <select style={styles.input} value={form.supplierId} onChange={(e) => setForm({ ...form, supplierId: e.target.value })}>
                                        <option value="">Selecciona un proveedor</option>
                                        {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                    </select>
                                </div>
                                <div style={styles.field}>
                                    <label style={styles.label}>Bodega *</label>
                                    <select style={styles.input} value={form.warehouseId} onChange={(e) => setForm({ ...form, warehouseId: e.target.value })}>
                                        <option value="">Selecciona una bodega</option>
                                        {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                                    </select>
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
                            <th style={styles.th}>Precio</th>
                            <th style={styles.th}>Stock</th>
                            <th style={styles.th}>Categoría</th>
                            <th style={styles.th}>Proveedor</th>
                            <th style={styles.th}>Bodega</th>
                            {isAdmin() && <th style={styles.th}>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id} style={styles.tr}>
                                <td style={styles.td}>{p.id}</td>
                                <td style={styles.td}>{p.name}</td>
                                <td style={styles.td}>${p.price}</td>
                                <td style={styles.td}>{p.stock}</td>
                                <td style={styles.td}>{p.categoryName}</td>
                                <td style={styles.td}>{p.supplierName}</td>
                                <td style={styles.td}>{p.warehouseName}</td>
                                {isAdmin() && (
                                    <td style={styles.td}>
                                        <button style={styles.editBtn} onClick={() => handleEdit(p)}>
                                            <Pencil size={14} /> Editar
                                        </button>
                                        <button style={styles.deleteBtn} onClick={() => handleDelete(p.id)}>
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

export default Products;