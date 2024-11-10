import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Products({ user, isLoggedIn }) {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost/renoon/getProducts.php?category=${category}`)
      .then(response => response.json())
      .then(data => setProducts(data.products || []))
      .catch(error => console.error('Error fetching products:', error));
  }, [category]);

  const handleAddToCart = async (product_id) => {
    if (!user) return; 

    try {
      const response = await fetch('http://localhost/renoon/addToCart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.user_id, product_id, quantity: 1 }),
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert("Could not add to cart.");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">{category.charAt(0).toUpperCase() + category.slice(1)}'s Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.product_id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
              <img src={product.image_url} alt={product.name} className="w-full h-64 object-cover rounded-md mb-4" />
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-lg font-medium text-gray-700">${product.price}</p>
              {isLoggedIn && (
                <button
                  onClick={() => handleAddToCart(product.product_id)}
                  className="mt-4 px-4 py-2 bg-[#ff79c7] text-white rounded hover:bg-[#ff66b3]"
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-500">No products found in this category.</p>
        )}
      </div>
    </div>
  );
}

export default Products;
