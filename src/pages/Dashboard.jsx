export default function Dashboard() {
  return (
    <section>
      <h2>Dashboard</h2>
      <div className="cards">
        <div className="card"><span>Vendas hoje</span><strong>R$ 0,00</strong></div>
        <div className="card"><span>Produtos cadastrados</span><strong>0</strong></div>
        <div className="card"><span>Estoque baixo</span><strong>0</strong></div>
        <div className="card"><span>Lucro estimado</span><strong>R$ 0,00</strong></div>
      </div>
      <div className="panel">
      </div>
    </section>
  );
}
