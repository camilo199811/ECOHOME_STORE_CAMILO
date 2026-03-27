function Header({ username, totalProducts, onLogout }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px",
      borderBottom: "1px solid #ccc"
    }}>
      <h3>EcoHome Store</h3>
      <div>
        <span style={{ marginRight: "20px" }}>
          {username} ({totalProducts})
        </span>
        <button onClick={onLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
}

export default Header;