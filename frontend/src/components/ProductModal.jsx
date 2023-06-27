import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ProductModal.scss";
import banniere from "../assets/banniere.jpg";
import Footer from "./Footer";

function ProductModal() {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/products`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="modal-container">
      <img className="banniere" src={banniere} alt="Bannière" />
      <div className="product-list">
        <div className="product-list-header">
          <input
            className="search-input"
            type="text"
            placeholder="Rechercher un produit"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="button" className="delete-button">
            <i className="fi fi-rr-trash" />
          </button>
        </div>
        <div className="product-list-body">
          <table className="product-list-table">
            <thead className="product-list-table-header">
              <tr>
                <th>Nom</th>
                <th>Référence</th>
                <th>Prix</th>
              </tr>
            </thead>
            <tbody className="product-list-table-body">
              {products
                .filter((product) =>
                  product.name.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.reference}</td>
                    <td>{product.price}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="product-list-footer">
          <button type="button" className="add-product">
            <p>Nouveau produit</p>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductModal;
