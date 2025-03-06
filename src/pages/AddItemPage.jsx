import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../api/items-api';

const AddItemPage = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            console.error(error, "while creating item");
        }
    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">Add New Item</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { label: 'Item Name', type: 'text', value: name, onChange: setName, placeholder: 'Enter item name' },
                        { label: 'Price (Rs)', type: 'number', value: price, onChange: setPrice, placeholder: 'Enter price' },
                        { label: 'Upload Image', type: 'file', onChange: (e) => setImage(e.target.files[0]) }
                    ].map((field, index) => (
                        <div key={index}>
                            <label className="block text-gray-700 font-medium mb-1">{field.label}</label>
                            <input
                                type={field.type}
                                value={field.value}
                                onChange={(e) => field.onChange(field.type === 'file' ? e : e.target.value)}
                                className="w-full px-4 py-2 border bg-gray-500 rounded-lg focus:ring focus:ring-blue-300"
                                placeholder={field.placeholder}
                                required
                            />
                        </div>
                    ))}

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
