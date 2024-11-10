import React, { useEffect, useState } from 'react';

function Cart({ user }) {  
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user && user.user_id) {
        try {
          const response = await fetch('http://localhost/renoon/getCartItems.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: user.user_id }),
            credentials: 'include', 
          });
          const result = await response.json();
          if (result.status === 'success') {
            setCartItems(result.cartItems);
          } else {
            console.error(result.message);
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };

    fetchCartItems();
  }, [user]);

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map(item => (
            <li key={item.cart_items_id} >
              <div className='border p-5 inline-block'>
                <img src={item.image_url} alt={item.alt_text} className='h-60'/>
                <p>{item.name} - ${item.price} (Quantity: {item.quantity})</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
