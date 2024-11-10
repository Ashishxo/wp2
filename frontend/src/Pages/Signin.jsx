import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Signin({ setIsLoggedIn, setUser }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost/renoon/signin.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (result.status === 'success') {
                alert(result.message);
                setIsLoggedIn(true);
                setUser({ user_id: result.user_id, name: result.user_name });
                console.log("User logged in:", { user_id: result.user_id, name: result.user_name });
                navigate("/"); 
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error with signing in.");
        }
    };

    return (
        <div className='flex justify-center mt-8'>
            <div className='border w-[50%] rounded-2xl p-4'>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
                    <label>Email*: </label>
                    <input type="email" className='border' name='email' value={formData.email} onChange={handleChange} required /><br />
                    
                    <label>Password*: </label>
                    <input type="password" className='border' name='password' value={formData.password} onChange={handleChange} required /><br />
                    
                    <input type="submit" value="Sign In" className='border bg-[#ffa6b6] text-white rounded px-4 py-2 cursor-pointer ' />

                    <span className='mt-5'>New User?</span> <br />
                    <Link to="/signup">
                    <button className='font-normal border p-3 rounded-xl text-[#FFA6B6] border-[#FFA6B6] hover:text-white hover:bg-[#FFA6B6] text-sm duration-200'>
                    SIGN UP
                    </button>
                    </Link>

                </form>
                
            </div>
        </div>
    );
}

export default Signin;
