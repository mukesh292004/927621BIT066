import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [n, setN] = useState(10);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [category, setCategory] = useState("Phone");
  const [sortingOption, setSortingOption] = useState("price");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch(
      `http://localhost:3000/categories/${category}/products?n=${n}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
    const data = await response.json();
    setProducts(data.data);
    setFilteredProducts(data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, [category, n, minPrice, maxPrice]);

  const handleFilter = () => {
    let filtered = products.filter(
      (product) =>
        product.price >= minPrice &&
        product.price <= maxPrice &&
        product.availability === "yes"
    );
    setFilteredProducts(filtered);
  };

  const handleSort = () => {
    let sorted = [...filteredProducts];
    switch (sortingOption) {
      case "price":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        sorted.sort((a, b) => b.discount - a.discount);
        break;
      default:
        sorted.sort((a, b) => a.price - b.price);
    }
    setFilteredProducts(sorted);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="mb-4 flex">
        <select
          className="border p-2 rounded mr-2"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          {categories.map((category, idx) => (
            <option key={idx} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          className="border p-2 rounded mr-2"
          type="number"
          placeholder="N"
          value={n}
          onChange={(e) => {
            setN(e.target.value);
          }}
        />
        <input
          className="border p-2 rounded mr-2"
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => {
            setMinPrice(e.target.value);
          }}
        />
        <input
          className="border p-2 rounded mr-2"
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
          }}
        />
        <Button
          auto
          onClick={handleFilter}
          className="mr-2"
          color="primary"
          variant="contained"
        >
          Filter
        </Button>
        <select
          className="border p-2 rounded mr-2"
          value={sortingOption}
          onChange={(e) => {
            setSortingOption(e.target.value);
            handleSort();
          }}
        >
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="discount">Discount</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
