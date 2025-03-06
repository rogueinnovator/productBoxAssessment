const BASE_URL = import.meta.env.VITE_BASE_URL;
// 1.FETCH ALL ITEMS
export const fetchItems = async () => {
    try {
        const res = await fetch(BASE_URL);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};
// 2.DELETE ITEM
export const deleteItem = async (itemId) => {
    try {
        const res = await fetch(`${BASE_URL}/${itemId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) {
            throw new Error(`failed: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error while deleting", error);
    }
};
// 3.ADD ITEM
export const addItem = async (formData) => {
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            body: formData
        });
        if (!res.ok) {
            throw new Error(`failed: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error(error, "Error while adding items ");
    }
};
// 4.GET AN ITEM
export const getAnItem = async (itemId) => {
    try {
        const res = await fetch(`${BASE_URL}/${itemId}`);
        if (!res.ok) {
            throw new Error(`HTTP error status:${res.status}`);
        }
        return await res.json();

    } catch (error) {
        console.error(error, "error while fetching item");

    }

};