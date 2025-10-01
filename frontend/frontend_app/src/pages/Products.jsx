import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [editId, setEditId] = useState(null);

  // Fetch products from API
  const fetchProducts = async () => {
    const res = await api.get("products/");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Create / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await api.put(`products/${editId}/`, form);
    } else {
      await api.post("products/", form);
    }
    setForm({ name: "", description: "", price: "" });
    setEditId(null);
    fetchProducts();
  };

  // Delete product
  const handleDelete = async (id) => {
    await api.delete(`products/${id}/`);
    fetchProducts();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-[#023acb] mb-4">Products</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 mb-6 bg-white p-4 rounded shadow"
      >
        <input
          className="border p-2 flex-1"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="border p-2 flex-1"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="number"
          className="border p-2 flex-1"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <button className="bg-[#023acb] text-white px-4 rounded">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* List */}
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="p-2 border-b">{p.name}</td>
              <td className="p-2 border-b">{p.description}</td>
              <td className="p-2 border-b">₹{p.price}</td>
              <td className="p-2 border-b space-x-3">
                <button
                  className="text-blue-600"
                  onClick={() => {
                    setForm(p);
                    setEditId(p.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(p.id)}
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
