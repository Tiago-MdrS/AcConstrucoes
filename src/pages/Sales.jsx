import { useRef, useState } from 'react';
import { apiGet, apiPost } from '../services/api';

export default function Sales() {
  const [barcode, setBarcode] = useState('');
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Dinheiro');
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const total = cart.reduce((sum, item) => sum + item.quantity * item.salePrice, 0) - discount;

  async function readBarcode(e) {
    if (e.key !== 'Enter' || !barcode.trim()) return;
    try {
      const product = await apiGet(`/products/barcode/${barcode.trim()}`);
      setCart(prev => {
        const exists = prev.find(i => i.id === product.id);
        if (exists) return prev.map(i => i.id === product.id ? {...i, quantity: i.quantity + 1} : i);
        return [...prev, {...product, quantity: 1}];
      });
      setBarcode('');
      setMessage('Produto adicionado ao carrinho');
    } catch {
      setMessage('Produto não cadastrado');
      setBarcode('');
    }
    inputRef.current?.focus();
  }

  async function finishSale() {
    try {
      await apiPost('/sales', {
        customerId: null,
        discount,
        paymentMethod,
        isCreditSale: false,
        items: cart.map(i => ({ productId: i.id, quantity: i.quantity }))
      });
      setCart([]);
      setDiscount(0);
      setMessage('Venda finalizada e estoque atualizado!');
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <section>
      <h2>Vendas / Caixa</h2>
      <div className="panel">
        <label>Leitor de código de barras</label>
        <input ref={inputRef} autoFocus className="barcode" placeholder="Escaneie o produto aqui" value={barcode} onChange={e => setBarcode(e.target.value)} onKeyDown={readBarcode} />
        {message && <p className="message">{message}</p>}
      </div>
      <div className="panel">
        <h3>Carrinho</h3>
        <table><thead><tr><th>Produto</th><th>Qtd</th><th>Preço</th><th>Subtotal</th></tr></thead>
          <tbody>{cart.map(item => <tr key={item.id}><td>{item.name}</td><td><input type="number" value={item.quantity} onChange={e => setCart(cart.map(i => i.id === item.id ? {...i, quantity: Number(e.target.value)} : i))} /></td><td>R$ {Number(item.salePrice).toFixed(2)}</td><td>R$ {(item.quantity * item.salePrice).toFixed(2)}</td></tr>)}</tbody>
        </table>
        <div className="checkout">
          <input type="number" step="0.01" placeholder="Desconto" value={discount} onChange={e => setDiscount(Number(e.target.value))} />
          <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}><option>Dinheiro</option><option>Pix</option><option>Cartão</option><option>Fiado</option></select>
          <strong>Total: R$ {total.toFixed(2)}</strong>
          <button onClick={finishSale} disabled={cart.length === 0}>Finalizar Venda</button>
        </div>
      </div>
    </section>
  );
}
