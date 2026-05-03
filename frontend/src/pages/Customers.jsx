import { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../services/api';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', document: '', phone: '', address: '' });

  async function load() {
    try { setCustomers(await apiGet('/customers')); } catch { setCustomers([]); }
  }

  useEffect(() => { load(); }, []);

  async function save(e) {
    e.preventDefault();
    await apiPost('/customers', form);
    setForm({ name: '', document: '', phone: '', address: '' });
    load();
  }

  return (
    <section>
      <h2>Clientes</h2>
      <form className="form" onSubmit={save}>
        <input placeholder="Nome" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="CPF/CNPJ" value={form.document} onChange={e => setForm({...form, document: e.target.value})} />
        <input placeholder="Telefone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
        <input placeholder="Endereço" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
        <button>Cadastrar Cliente</button>
      </form>
      <div className="panel">
        <table><thead><tr><th>Nome</th><th>CPF/CNPJ</th><th>Telefone</th><th>Endereço</th></tr></thead>
          <tbody>{customers.map(c => <tr key={c.id}><td>{c.name}</td><td>{c.document}</td><td>{c.phone}</td><td>{c.address}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}
