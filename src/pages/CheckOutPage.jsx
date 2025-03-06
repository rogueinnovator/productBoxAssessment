import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const CheckoutPage = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    // useEffect(() => {
    //     localStorage.setItem('cart', JSON.stringify(cart));
    // }, [cart]);

    const handleRemoveFromCart = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="min-h-screen w-screen p-6 bg-gray-100 mt-12">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl text-gray-700 font-bold mb-4">Checkout</h2>

                {cart.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty.</p>
                ) : (
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center p-4 border-b">
                                <div className="flex items-center space-x-4">
                                    <img src={`http://localhost:3000/${item.img}`} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                    <div>
                                        <h3 className="text-lg text-gray-600 font-semibold">{item.name}</h3>
                                        <p className="text-gray-600">Rs{item.price}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleRemoveFromCart(item.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                                    Remove
                                </button>
                            </div>
                        ))}

                    </div>
                )}

                <button onClick={() => navigate('/items')} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Back to Shop
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;
