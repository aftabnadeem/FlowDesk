import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editId, setEditId] = useState(null);

  const fetchClients = async () => {
    const res = await api.get("clients/");
    setClients(res.data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await api.put(`clients/${editId}/`, form);
    } else {
      await api.post("clients/", form);
    }
    setForm({ name: "", email: "", phone: "" });
    setEditId(null);
    fetchClients();
  };

  const handleDelete = async (id) => {
    await api.delete(`clients/${id}/`);
    fetchClients();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-[#023acb] mb-4">Clients</h1>

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
        />
        <input
          className="border p-2 flex-1"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border p-2 flex-1"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id}>
              <td className="p-2 border-b">{c.name}</td>
              <td className="p-2 border-b">{c.email}</td>
              <td className="p-2 border-b">{c.phone}</td>
              <td className="p-2 border-b space-x-3">
                <button
                  className="text-blue-600"
                  onClick={() => {
                    setForm(c);
                    setEditId(c.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(c.id)}
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
