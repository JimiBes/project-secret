import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/ProductModal.scss";
import banniere from "../assets/banniere.jpg";
import Footer from "./Footer";
import AddProductModal from "./AddProductModal";

function ProductModal() {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
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
  };

  const openAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const closeAddProductModal = () => {
    setIsAddProductModalOpen(false);
  };

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
    loadProducts(); // reload products from server
  };

  const handleDelete = (productId) => {
    Swal.fire({
      title: "Êtes-vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez-le!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_BACKEND_URL}/products/${productId}`)
          .then(() => {
            setProducts(products.filter((product) => product.id !== productId));
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

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
        </div>
        <div className="product-list-body">
          <table className="product-list-table">
            <thead className="product-list-table-header">
              <tr>
                <th>Nom</th>
                <th>Référence</th>
                <th>Prix</th>
                <th>Supprimer</th>
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
                    <td>{product.price} €</td>
                    <td>
                      <button
                        type="button"
                        className="delete-product-button"
                        onClick={() => handleDelete(product.id)}
                      >
                        <i className="fi fi-rr-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="product-list-footer">
          <button
            type="button"
            className="add-product"
            onClick={openAddProductModal}
          >
            <p>Nouveau produit</p>
          </button>
        </div>
      </div>
      <Footer />
      {isAddProductModalOpen && (
        <AddProductModal
          onClose={closeAddProductModal}
          onAddProduct={addProduct}
        />
      )}
    </div>
  );
}

export default ProductModal;
