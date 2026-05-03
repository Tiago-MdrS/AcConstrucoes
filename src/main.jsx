import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Home, Package, ShoppingCart, Users, BarChart3 } from 'lucide-react';
import './styles/global.css';
import logo from './assets/logo.png';

import Products from './pages/Products.jsx';
import Sales from './pages/Sales.jsx';
import Customers from './pages/Customers.jsx';
import Reports from './pages/Reports.jsx';
import Dashboard from './pages/Dashboard.jsx';
const pages = {
  
  products: <Products />,
  sales: <Sales />,
  customers: <Customers />,
  reports: <Reports />,
  dashboard: <Dashboard />,
};

function App() {
  const [active, setActive] = useState('dashboard');

  const menu = [

    { id: 'sales', label: 'Vendas', icon: ShoppingCart },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'customers', label: 'Clientes', icon: Users },
    { id: 'reports', label: 'Relatórios', icon: BarChart3 },
    { id: 'dashboard', label: 'Dashboard', icon: Home },
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
  <img src={logo} alt="Logo" />
  <div>
    <h1>AC Construções</h1>
    <p>Sistema Comercial</p>
  </div>
</div>
        <nav>
          {menu.map(item => {
            const Icon = item.icon;
            return (
              <button key={item.id} className={active === item.id ? 'active' : ''} onClick={() => setActive(item.id)}>
                <Icon size={18} /> {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
      <main className="content">{pages[active]}</main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
