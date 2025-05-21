import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCart();
    fetchProducts();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.products || []);
    } catch (err) {
      console.error("Fetch cart error:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const getProductDetails = (id) => {
    return products.find((p) => p._id === id);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-red-100 py-8 px-4">
        <h1 className="text-center text-4xl font-bold text-red-600 mb-6">
          YOUR SHOPPING CART
        </h1>

        <div className="bg-red-200 p-4 rounded shadow max-w-3xl mx-auto space-y-4">
          {cartItems.map((item, idx) => {
            const product = getProductDetails(item.productId);
            return (
              <div
                key={idx}
                className="flex justify-between items-center bg-white p-3 rounded shadow"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product?.image || "https://via.placeholder.com/80"}
                    className="h-16 w-16 object-cover"
                    alt={product?.name}
                  />
                  <div>
                    <h2 className="font-semibold">
                      {product?.name || "Unknown"}
                    </h2>
                    <p>Price: Rs. {product?.price || 0}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
                <FaTrash
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleRemove(item.productId)}
                />
              </div>
            );
          })}
        </div>

        <div className="text-center mt-6">
          <Link to="/home">
            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
              BACK TO HOME
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
