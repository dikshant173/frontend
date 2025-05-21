import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";

export default function Navbar({ cartCount }) {
  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow bg-white">
      <div className="text-2xl font-bold">Exclusive</div>

      <ul className="flex space-x-6 text-lg">
        <li>
          <Link to="/home" className="border-b-2 border-black">
            Home
          </Link>
        </li>
        <li>
          <Link to="">Contact</Link>
        </li>
        <li>
          <Link to="">About</Link>
        </li>
      </ul>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="px-4 py-1 bg-gray-100 border border-gray-300 rounded"
          />
          <FaSearch className="absolute right-2 top-2 text-gray-600" />
        </div>
        <FaHeart className="text-xl cursor-pointer" />

        <Link to="/cart" className="relative">
          <FaShoppingCart className="text-xl cursor-pointer" />
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
                fontWeight: "bold",
                minWidth: "18px",
                textAlign: "center",
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
