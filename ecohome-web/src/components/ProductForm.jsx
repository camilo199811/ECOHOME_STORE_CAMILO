import { useState } from "react";

function ProductForm({ onCreate }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });

    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Crear producto</h2>

      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={form.price}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
      />
      <br /><br />

      <button type="submit">Guardar producto</button>
    </form>
  );
}

export default ProductForm;