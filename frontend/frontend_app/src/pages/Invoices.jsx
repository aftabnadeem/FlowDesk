import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    client: "",
    due_date: "",
    status: "draft",
    notes: "",
    discount: 0,
    items: [],
  });

  const [item, setItem] = useState({ product: "", quantity: 1, discount: 0 });
  const [editId, setEditId] = useState(null);

  // Fetch invoices, clients, products
  const fetchInvoices = async () => {
    const res = await api.get("invoices/");
    setInvoices(res.data);
  };

  const fetchClients = async () => {
    const res = await api.get("clients/");
    setClients(res.data);
  };

  const fetchProducts = async () => {
    const res = await api.get("products/");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchInvoices();
    fetchClients();
    fetchProducts();
  }, []);

  // Add an item to invoice form
  const addItem = () => {
    if (!item.product) return;
    setForm({ ...form, items: [...form.items, item] });
    setItem({ product: "", quantity: 1, discount: 0 });
  };

  // Submit (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await api.put(`invoices/${editId}/`, form);
    } else {
      await api.post("invoices/", form);
    }
    setForm({
      client: "",
      due_date: "",
      status: "draft",
      notes: "",
      discount: 0,
      items: [],
    });
    setEditId(null);
    fetchInvoices();
  };

  // Delete invoice
  const handleDelete = async (id) => {
    await api.delete(`invoices/${id}/`);
    fetchInvoices();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-[#023acb] mb-4">Invoices</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 space-y-3"
      >
        <select
          className="border p-2 w-full"
          value={form.client}
          onChange={(e) => setForm({ ...form, client: e.target.value })}
          required
        >
          <option value="">Select Client</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border p-2 w-full"
          value={form.due_date}
          onChange={(e) => setForm({ ...form, due_date: e.target.value })}
          required
        />

        <select
          className="border p-2 w-full"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
        </select>

        <textarea
          className="border p-2 w-full"
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Discount"
          value={form.discount}
          onChange={(e) => setForm({ ...form, discount: e.target.value })}
        />

        {/* Items Form */}
        <div className="border p-3 rounded">
          <h3 className="font-semibold mb-2">Add Item</h3>
          <div className="flex gap-2">
            <select
              className="border p-2 flex-1"
              value={item.product}
              onChange={(e) => setItem({ ...item, product: e.target.value })}
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              className="border p-2 w-20"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) => setItem({ ...item, quantity: e.target.value })}
            />
            <input
              type="number"
              className="border p-2 w-24"
              placeholder="Discount"
              value={item.discount}
              onChange={(e) => setItem({ ...item, discount: e.target.value })}
            />
            <button
              type="button"
              className="bg-green-600 text-white px-3 rounded"
              onClick={addItem}
            >
              Add
            </button>
          </div>

          {/* Show added items */}
          <ul className="mt-2">
            {form.items.map((it, idx) => {
              const product = products.find((p) => p.id === parseInt(it.product));
              return (
                <li key={idx} className="text-sm text-gray-700">
                  {product ? product.name : "Product"} — {it.quantity} pcs (Discount: ₹{it.discount})
                </li>
              );
            })}
          </ul>
        </div>

        <button className="bg-[#023acb] text-white px-4 py-2 rounded">
          {editId ? "Update Invoice" : "Add Invoice"}
        </button>
      </form>

      {/* List */}
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Client</th>
            <th className="p-2 border">Due Date</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td className="p-2 border-b">{inv.client_name || inv.client}</td>
              <td className="p-2 border-b">{inv.due_date}</td>
              <td className="p-2 border-b">{inv.status}</td>
              <td className="p-2 border-b">₹{inv.total_amount}</td>
              <td className="p-2 border-b space-x-3">
                <button
                  className="text-blue-600"
                  onClick={() => {
                    setForm(inv);
                    setEditId(inv.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(inv.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
