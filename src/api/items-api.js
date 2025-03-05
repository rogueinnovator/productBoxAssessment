export const fetchItems = () => {
    fetch('http://localhost:3000/items')
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => console.log('Fetched items:', data))
        .catch(error => {
            console.error('Error fetching items:', error);
        });
};