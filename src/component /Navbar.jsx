import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='fixed top-0 w-full bg-gray-800 p-4 shadow-md'>
            <div className='flex justify-around space-x-4'>
                <Link to="/" className='text-white '>Home Page</Link>
                <Link to="/items" className='text-white '>Items Page</Link>
                <Link to="/checkout" className='text-white '>CheckOut Page</Link>
                <Link to="/add" className='text-white '>Add Items</Link>
            </div>
        </nav >
    );
};

export default Navbar;
