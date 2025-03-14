import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../api/items-api';

const AddItemPage = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'please add items name';
        if (!price) newErrors.price = 'please add price';
        if (!image) {
            newErrors.image = 'please add image';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('image', image);

        try {
            await addItem(formData);
            setTimeout(() => {
                navigate('/items');
            }, 1500);
        } catch (error) {
            console.error('Error while creating item:', error);
        }
    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">Add New Item</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Item Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Item Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border bg-gray-700 rounded-lg"
                            placeholder="Enter item name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* PRICE */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Price (Rs)</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-2 border bg-gray-700 rounded-lg"
                            placeholder="Enter price"
                        />
                        {errors.price && <p className=" text-red-500 text-sm mt-1">{errors.price}</p>}
                    </div>

                    {/* IMAGE */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Upload Image</label>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="px-8 py-2 border bg-gray-700 rounded-lg"
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
                    >
                        Add Item
                    </button>
                </form>

                <button
                    onClick={() => navigate('/items')}
                    className="w-full mt-3 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                    Back to Items
                </button>
            </div>
        </div>
    );
};

export default AddItemPage;
