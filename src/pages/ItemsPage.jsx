import React from 'react';
import { fetchItems } from '../api/items-api';

const ItemsPage = () => {
    return (
        <div>
            <button onClick={() => { fetchItems(); }} > fetchItems</button>
            <div></div>
        </div>
    );
};

export default ItemsPage;
