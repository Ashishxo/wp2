import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    mobile: '',
    email: '',
    address: '',
    password: '',
    type: 'no'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/renoon/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData),
      });
      const result = await response.json();
      if (result.status === 'success') {
        alert(result.message);
        navigate("/signin");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error with registration.");
    }
  };

  return (
    <div className='flex justify-center mt-8'>
      <div className='border w-[50%] rounded-2xl p-4'>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
          <label>First Name*: </label>
          <input type="text" className='border' name='fname' value={formData.fname} onChange={handleChange} required /><br />
          
          <label>Last Name: </label>
          <input type="text" className='border' name='lname' value={formData.lname} onChange={handleChange} /><br />
          
          <label>Mobile*: </label>
          <input type="text" className='border' name='mobile' value={formData.mobile} onChange={handleChange} required /><br />
          
          <label>Email*: </label>
          <input type="email" className='border' name='email' value={formData.email} onChange={handleChange} required /><br />
          
          <label>Address*: </label>
          <input type="text" className='border' name='address' value={formData.address} onChange={handleChange} required /><br />
          
          <label>Password*: </label>
          <input type="password" className='border' name='password' value={formData.password} onChange={handleChange} required /><br />
          
          <div>
            <label>Are you a Seller? </label>
            <input type="radio" name='type' value='yes' checked={formData.type === 'yes'} onChange={handleChange} /> Yes 
            <input type="radio" name='type' value='no' checked={formData.type === 'no'} onChange={handleChange} /> No
          </div>
          <br />
          
          <input type="submit" value="Sign Up" className='border bg-[#ff79c7] text-white rounded px-4 py-2 cursor-pointer' />



          <span className='mt-5'>Already Have an Account?</span> <br />
                    <Link to="/signin">
                    <button className='font-normal border p-3 rounded-xl text-[#FFA6B6] border-[#FFA6B6] hover:text-white hover:bg-[#FFA6B6] text-sm duration-200'>
                    SIGN IN
                    </button>
                    </Link>
        </form>

        
      </div>
    </div>
  );
}

export default Signup;
