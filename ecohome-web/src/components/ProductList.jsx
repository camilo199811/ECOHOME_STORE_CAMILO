function ProductList({ products, onDelete }) {
  return (
    <div>
      <h2>Catálogo de productos</h2>
      {products.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <h4>{product.name}</h4>
            <p><strong>Precio:</strong> ${product.price}</p>
            <p><strong>Creador:</strong> {product.creator?.username}</p>
            <p><strong>Descripción:</strong> {product.description}</p>
            <button onClick={() => onDelete(product.id)}>Eliminar</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductList;