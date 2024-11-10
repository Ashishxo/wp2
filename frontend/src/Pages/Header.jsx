import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost/renoon/logout.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       
      });
      const result = await response.json();
      if (result.status === 'success') {
        alert(result.message);
        setIsLoggedIn(false);
        navigate('/signin');
      } else {
        alert("Failed to log out.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while logging out.");
    }
  };

  return (
    <>
      <div className='h-5 bg-[#F1CAD1]'></div>
      <div className='flex justify-between ml-20 mr-20 mt-2'>
        <Link to="/">
          <h1 className='text-[#FFA6B6] text-2xl font-semibold mt-3'>R E N O O N</h1>
        </Link>
        <div className='mt-3 flex gap-6'>
          <input className='border rounded-3xl p-2 pl-5' type="text" placeholder='Search'/>
          {isLoggedIn ? (
            <>
              <Link to="/cart">
                <img src="./src/assets/cart.png" alt="Cart" className='h-10'/>
              </Link>
              <button
                onClick={handleLogout}
                className='font-normal border p-3 rounded-xl text-[#FFA6B6] border-[#FFA6B6] hover:text-white hover:bg-[#FFA6B6] text-sm duration-200'
              >
                LOGOUT
              </button>
            </>
          ) : (
            <Link to="/signin">
              <button className='font-normal border p-3 rounded-xl text-[#FFA6B6] border-[#FFA6B6] hover:text-white hover:bg-[#FFA6B6] text-sm duration-200'>
                SIGN IN
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
