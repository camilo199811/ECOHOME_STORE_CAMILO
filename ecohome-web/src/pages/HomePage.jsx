import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import ChatBox from "../components/ChatBox";

import {
  getProductsRequest,
  createProductRequest,
  deleteProductRequest,
} from "../api/products";
import { getMyStatsRequest } from "../api/users";

function HomePage({ user, token, onLogout }) {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ total_products: 0 });

  const loadProducts = async () => {
    try {
      const res = await getProductsRequest();
      setProducts(res.data);
    } catch (error) {
      console.error("Error cargando productos", error);
    }
  };

  const loadStats = async () => {
    try {
      const res = await getMyStatsRequest(token);
      setStats(res.data);
    } catch (error) {
      console.error("Error cargando stats", error);
    }
  };

  const handleCreate = async (product) => {
    try {
      await createProductRequest(product, token);
      await loadProducts();
      await loadStats();
    } catch (error) {
      console.error("Error creando producto", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProductRequest(id, token);
      await loadProducts();
      await loadStats();
    } catch (error) {
      console.error("Error eliminando producto", error);
    }
  };

  useEffect(() => {
    loadProducts();
    loadStats();
  }, []);

  return (
    <div>
      <Header
        username={user.username}
        totalProducts={stats.total_products || 0}
        onLogout={onLogout}
      />

      <div style={{ padding: "20px" }}>
        <ProductForm onCreate={handleCreate} />
        <ProductList products={products} onDelete={handleDelete} />
        <ChatBox token={token} username={user.username} />
      </div>
    </div>
  );
}

export default HomePage;