import React, { useState, useRef } from "react";
import axios from "axios";
import "../styles/AddProductModal.scss";

function AddProductModal({ onClose, onAddProduct }) {
  const [productName, setProductName] = useState("");
  const [productReference, setProductReference] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const modalContent = useRef();

  const handleClick = (e) => {
    if (modalContent.current && !modalContent.current.contains(e.target)) {
      onClose();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const product = {
      name: productName,
      reference: productReference,
      price: productPrice,
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/products`, product)
      .then((response) => {
        if (response.status === 201) {
          onAddProduct(product);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    onClose();
  };

  return (
    <div className="add-product-modal" onClick={handleClick}>
      <div className="add-product-modal-content" ref={modalContent}>
        <h2>Ajouter un produit</h2>
        <form className="add-product-form" onSubmit={handleSubmit}>
          <label>
            Nom :
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </label>
          <label>
            Référence :
            <input
              type="text"
              value={productReference}
              onChange={(e) => setProductReference(e.target.value)}
              required
            />
          </label>
          <label>
            Prix :
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </label>
          <button className="add-product-button" type="submit">
            Ajouter
          </button>
        </form>
        <button type="button" className="close-button" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
}

export default AddProductModal;
