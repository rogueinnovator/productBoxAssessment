import React, { useEffect, useState } from 'react';
import { deleteItem, fetchItems } from '../api/items-api';
import { Link } from 'react-router-dom';
const ItemsPage = () => {
    const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('items')) || []);
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
    useEffect(() => {
        const getData = async () => {
            const fetchedItems = await fetchItems();
            setItems(fetchedItems);
            localStorage.setItem('items', JSON.stringify(fetchedItems));
        };
        getData();
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleAddToCart = (item) => {
        if (!cart.some(cartItem => cartItem.id === item.id)) {
            setCart((prevCart) => [...prevCart, item]);
        }
    };
    const handleDelete = async (id) => {
        await deleteItem(id);
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
    };

    return (
        <div className="min-h-screen w-screen p-6 mt-11 bg-gray-100">
            <div className="flex justify-between items-center max-w-6xl mx-auto mb-6">
                <h2 className='text-2xl font-semibold bg-blue-800 text-white px-4 py-2 rounded-lg'>Items Count: {items.length}</h2>
                <h2 className='text-lg font-medium bg-green-600 text-white px-4 py-2 rounded-lg'>Cart: {cart.length} items</h2>
                <Link to="/checkout" className='text-lg font-medium bg-green-600 text-white px-4 py-2 rounded-lg'>checkOut</Link>
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((item) => (
                    <div key={item.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                        <img src={`http://localhost:3000/${item.img}`} alt={item.name} className="w-40 h-40 object-cover rounded-md mb-4" />
                        <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                        <p className="text-gray-700 text-sm mt-1 font-medium">Rs {item.price}</p>
                        <div className="mt-4 flex gap-2">
                            <button onClick={() => handleAddToCart(item)} className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition' disabled={cart.some(cartItem => cartItem.id === item.id)}>Add to Cart</button>
                            <button onClick={() => handleDelete(item.id)} className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition'>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemsPage;
