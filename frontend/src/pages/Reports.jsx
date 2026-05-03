import { useEffect, useState } from 'react';
import { apiGet } from '../services/api';

export default function Reports() {
  const [lowStock, setLowStock] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    apiGet('/products/low-stock').then(setLowStock).catch(() => setLowStock([]));
    apiGet('/sales').then(setSales).catch(() => setSales([]));
  }, []);

  const totalSales = sales.reduce((sum, sale) => sum + Number(sale.total || 0), 0);

  return (
    <section>
      <h2>Relatórios</h2>
      <div className="cards">
        <div className="card"><span>Total vendido</span><strong>R$ {totalSales.toFixed(2)}</strong></div>
        <div className="card"><span>Vendas registradas</span><strong>{sales.length}</strong></div>
        <div className="card"><span>Estoque baixo</span><strong>{lowStock.length}</strong></div>
      </div>
      <div className="panel">
        <h3>Produtos com estoque baixo</h3>
        <table><thead><tr><th>Produto</th><th>Estoque</th><th>Mínimo</th></tr></thead>
          <tbody>{lowStock.map(p => <tr key={p.id}><td>{p.name}</td><td>{p.currentStock}</td><td>{p.minimumStock}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}
