import { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../services/api';

const empty = {
  name: '', internalCode: '', barcode: '', category: '', unit: 'Unidade',
  costPrice: 0, salePrice: 0, supplier: '', currentStock: 0, minimumStock: 0
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(empty);
  const [message, setMessage] = useState('');

  async function load() {
    try { setProducts(await apiGet('/products')); } catch { setProducts([]); }
  }

  useEffect(() => { load(); }, []);

  async function save(e) {
    e.preventDefault();
    try {
      await apiPost('/products', form);
      setForm(empty);
      setMessage('Produto cadastrado com sucesso!');
      load();
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <section>
      <h2>Cadastro de Produtos</h2>
      <form className="form" onSubmit={save}>
        <input placeholder="Nome" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Código interno" value={form.internalCode} onChange={e => setForm({...form, internalCode: e.target.value})} />
        <input autoFocus placeholder="Código de barras - escaneie aqui" value={form.barcode} onChange={e => setForm({...form, barcode: e.target.value})} />
        <input placeholder="Categoria" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
        <select value={form.unit} onChange={e => setForm({...form, unit: e.target.value})}>
          <option>Unidade</option><option>Metro</option><option>Kg</option><option>Saco</option><option>Caixa</option><option>Litro</option><option>Barra</option>
        </select>
        <input type="number" step="0.01" placeholder="Preço de custo" value={form.costPrice} onChange={e => setForm({...form, costPrice: Number(e.target.value)})} />
        <input type="number" step="0.01" placeholder="Preço de venda" value={form.salePrice} onChange={e => setForm({...form, salePrice: Number(e.target.value)})} />
        <input placeholder="Fornecedor" value={form.supplier} onChange={e => setForm({...form, supplier: e.target.value})} />
        <input type="number" step="0.01" placeholder="Estoque atual" value={form.currentStock} onChange={e => setForm({...form, currentStock: Number(e.target.value)})} />
        <input type="number" step="0.01" placeholder="Estoque mínimo" value={form.minimumStock} onChange={e => setForm({...form, minimumStock: Number(e.target.value)})} />
        <button>Cadastrar Produto</button>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="panel">
        <h3>Produtos</h3>
        <table><thead><tr><th>Produto</th><th>Código barras</th><th>Unidade</th><th>Preço</th><th>Estoque</th></tr></thead>
          <tbody>{products.map(p => <tr key={p.id}><td>{p.name}</td><td>{p.barcode}</td><td>{p.unit}</td><td>R$ {Number(p.salePrice).toFixed(2)}</td><td>{p.currentStock}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}
