import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://backend-pre8.onrender.com/api/products"
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(
        "https://backend-pre8.onrender.com/api/cart/add",
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Added to cart");
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <header className="text-center text-3xl font-bold text-blue-700 py-6 shadow bg-white">
        WELCOME TO OUR STORE
      </header>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded shadow text-center"
          >
            <img
              src={product.image || "https://via.placeholder.com/150"}
              alt={product.name}
              className="h-40 mx-auto object-cover mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="mb-2 text-gray-600">Price: Rs. {product.price}</p>
            <button
              onClick={() => handleAddToCart(product._id)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-1 px-4 rounded"
            >
              ADD TO CART
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
